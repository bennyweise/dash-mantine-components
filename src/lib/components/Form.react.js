import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {omit} from 'ramda';
import {
    Checkbox,
    Chips,
    ColorInput,
    ColorPicker,
    JsonInput,
    MultiSelect,
    NumberInput,
    PasswordInput,
    RadioGroup,
    SegmentedControl,
    Select,
    Slider,
    Switch,
    Textarea,
    TextInput,
    TransferList,
    Button,
    Group,
    Box,
} from '@mantine/core';
import {useForm} from '@mantine/form';

const componentMap = {
    checkbox: Checkbox,
    chips: Chips,
    colorInput: ColorInput,
    colorPicker: ColorPicker,
    json: JsonInput,
    multiselect: MultiSelect,
    number: NumberInput,
    password: PasswordInput,
    radio: RadioGroup,
    segmentedControl: SegmentedControl,
    select: Select,
    slider: Slider,
    switch: Switch,
    textarea: Textarea,
    text: TextInput,
    transferList: TransferList,
};

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
                {React.createElement(componentMap['text'], {
                    required: true,
                    label: 'Email',
                    placeholder: 'your@email',
                    ...form.getInputProps('email'),
                })}

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
     * The ID of this component, used to identify dash components in callbacks
     */
    id: PropTypes.string,

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
