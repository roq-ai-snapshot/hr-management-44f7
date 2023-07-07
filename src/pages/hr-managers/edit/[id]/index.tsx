import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getHrManagerById, updateHrManagerById } from 'apiSdk/hr-managers';
import { Error } from 'components/error';
import { hrManagerValidationSchema } from 'validationSchema/hr-managers';
import { HrManagerInterface } from 'interfaces/hr-manager';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function HrManagerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<HrManagerInterface>(
    () => (id ? `/hr-managers/${id}` : null),
    () => getHrManagerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: HrManagerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateHrManagerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/hr-managers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<HrManagerInterface>({
    initialValues: data,
    validationSchema: hrManagerValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Hr Manager
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="employee_data" mb="4" isInvalid={!!formik.errors?.employee_data}>
              <FormLabel>Employee Data</FormLabel>
              <Input
                type="text"
                name="employee_data"
                value={formik.values?.employee_data}
                onChange={formik.handleChange}
              />
              {formik.errors.employee_data && <FormErrorMessage>{formik.errors?.employee_data}</FormErrorMessage>}
            </FormControl>
            <FormControl id="time_tracking" mb="4" isInvalid={!!formik.errors?.time_tracking}>
              <FormLabel>Time Tracking</FormLabel>
              <Input
                type="text"
                name="time_tracking"
                value={formik.values?.time_tracking}
                onChange={formik.handleChange}
              />
              {formik.errors.time_tracking && <FormErrorMessage>{formik.errors?.time_tracking}</FormErrorMessage>}
            </FormControl>
            <FormControl id="performance_evaluation" mb="4" isInvalid={!!formik.errors?.performance_evaluation}>
              <FormLabel>Performance Evaluation</FormLabel>
              <Input
                type="text"
                name="performance_evaluation"
                value={formik.values?.performance_evaluation}
                onChange={formik.handleChange}
              />
              {formik.errors.performance_evaluation && (
                <FormErrorMessage>{formik.errors?.performance_evaluation}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="engagement_tools" mb="4" isInvalid={!!formik.errors?.engagement_tools}>
              <FormLabel>Engagement Tools</FormLabel>
              <Input
                type="text"
                name="engagement_tools"
                value={formik.values?.engagement_tools}
                onChange={formik.handleChange}
              />
              {formik.errors.engagement_tools && <FormErrorMessage>{formik.errors?.engagement_tools}</FormErrorMessage>}
            </FormControl>
            <FormControl id="automation_tools" mb="4" isInvalid={!!formik.errors?.automation_tools}>
              <FormLabel>Automation Tools</FormLabel>
              <Input
                type="text"
                name="automation_tools"
                value={formik.values?.automation_tools}
                onChange={formik.handleChange}
              />
              {formik.errors.automation_tools && <FormErrorMessage>{formik.errors?.automation_tools}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'hr_manager',
    operation: AccessOperationEnum.UPDATE,
  }),
)(HrManagerEditPage);
