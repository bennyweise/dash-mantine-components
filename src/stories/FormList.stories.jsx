import React from 'react';

import { useForm, formList } from '@mantine/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button, Code } from '@mantine/core';
import { TrashIcon } from '@radix-ui/react-icons'

function Demo() {
    const form = useForm({
      initialValues: {
        employees: formList([{ name: '', active: false }]),
      },
    });
  
    const fields = form.values.employees.map((_, index) => (
      <Group key={index} mt="xs">
        <TextInput
          placeholder="John Doe"
          required
          sx={{ flex: 1 }}
          {...form.getListInputProps('employees', index, 'name')}
        />
        <Switch label="Active" {...form.getListInputProps('employees', index, 'active')} />
        <ActionIcon
          color="red"
          variant="hover"
          onClick={() => form.removeListItem('employees', index)}
        >
          <TrashIcon size={16} />
        </ActionIcon>
      </Group>
    ));
  
    return (
      <Box sx={{ maxWidth: 500 }} mx="auto">
        {fields.length > 0 ? (
          <Group mb="xs">
            <Text weight={500} size="sm" sx={{ flex: 1 }}>
              Name
            </Text>
            <Text weight={500} size="sm" pr={90}>
              Status
            </Text>
          </Group>
        ) : (
          <Text color="dimmed" align="center">
            No one here...
          </Text>
        )}
  
        {fields}
  
        <Group position="center" mt="md">
          <Button onClick={() => form.addListItem('employees', { name: '', active: false })}>
            Add employee
          </Button>
        </Group>
  
        <Text size="sm" weight={500} mt="md">
          Form values:
        </Text>
        <Code block>{JSON.stringify(form.values, null, 2)}</Code>
      </Box>
    );
  }

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/FormList',
  component: Box,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => Demo();

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
};
