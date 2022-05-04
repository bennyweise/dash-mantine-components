import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {TextInput, Checkbox, Button, Group, Box} from '@mantine/core';
import {useForm} from '@mantine/form';

/**
 * Form. For more information, see: https://mantine.dev/form/use-form/
 */
const Form = (props) => {
    const {class_name, setProps} = props;

    const form = useForm({
        initialValues: {
            email: '',
            termsOfService: false,
        },

        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : 'Invalid email',
        },
    });

    useEffect(
        (values) => {
            console.log('Value changed');
            console.log(values);
            setProps({value: form.values});
        },
        [form.values]
    );

    return (
        <Box sx={{maxWidth: 300}} mx="auto">
            <form
                onSubmit={form.onSubmit((values) => setProps({value: values}))}
            >
                <TextInput
                    required
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />

                <Checkbox
                    mt="md"
                    label="I agree to sell my privacy"
                    {...form.getInputProps('termsOfService', {
                        type: 'checkbox',
                    })}
                />

                <Group position="right" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );

    // return (
    //     <MantineHeader
    //         {...omit(['setProps', 'children', 'class_name', 'value'], props)}
    //         className={class_name}
    //     >
    //         {props.children}
    //     </MantineHeader>
    // );
};

Form.displayName = 'Form';

Form.defaultProps = {};

Form.propTypes = {
    /**
     *  Header content
     */
    children: PropTypes.node,

    /**
     *  Often used with CSS to style elements with common properties
     */
    class_name: PropTypes.string,

    /**
     * Form value
     */
    value: PropTypes.any,
};

export default Form;
