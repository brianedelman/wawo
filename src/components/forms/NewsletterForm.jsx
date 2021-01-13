import { Formik, Form } from 'formik';

import { NewsletterSchema } from 'schemas';
import AutoCompleteField from 'components/forms/fields/AutoCompleteField';
import InputField from 'components/forms/fields/InputField';

// TODO: this should mirror functionality on wawo site, bailing for now cuz it's slowing me down
const NewsletterForm = () => {
  const handleFormSubmit = values => {
    console.log(values);
  };
  return (
    <Formik
      validationSchema={NewsletterSchema}
      initialValues={{
        email: '',
        newsletterType: '',
      }}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <InputField
            fullWidth
            name="client.project"
            type="text"
            label="Email Address"
            value={values.email}
            errors={errors}
          />
          <AutoCompleteField
            fullWidth
            label="What type of content do you want to see?"
            name="newsletterType"
            optionLabel={option => option.label}
            errors={errors}
            callback={() => {
              return [
                {
                  value: '2500616d06',
                  label: 'I am a women-owned business',
                },
                {
                  value: 'a60c22c501',
                  label: 'I want to learn more about women-owned businesses',
                },
              ];
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default NewsletterForm;
