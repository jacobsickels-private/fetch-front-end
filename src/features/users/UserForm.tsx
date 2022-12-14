import {
    Button,
    Container,
    Grid,
    Group,
    PasswordInput,
    Select,
    SimpleGrid,
    Stack,
    TextInput,
    Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import axios from 'axios'
import { useMutation, useQuery } from 'react-query'
import { z } from 'zod'

interface FormInitialValues {
    occupations: string[]
    states: Array<{ name: string; abbreviation: string }>
}

interface FormValues {
    name: string
    email: string
    password: string
    occupation: string
    state: string
}

const schema = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(1),
    occupation: z.string().min(1),
    state: z.string().min(1),
})

interface UserFormProps {
    initialValues: FormValues
}

export const UserForm = ({ initialValues }: UserFormProps) => {
    const { data, isLoading } = useQuery<FormInitialValues>('form-initial-values', () =>
        axios.get('https://frontend-take-home.fetchrewards.com/form').then((resp) => resp.data)
    )

    const { mutate: saveUser, isLoading: isSavingUser } = useMutation(
        (values: FormValues) =>
            axios.post('https://frontend-take-home.fetchrewards.com/form', values).then((resp) => resp.data),

        {
            onSuccess: (response) => {
                showNotification({
                    message: `User ${response.name} created successfully with id ${response.id}`,
                })
            },
            onError: (err) => {
                showNotification({
                    message: 'There was an error saving this user',
                })
            },
        }
    )

    const { getInputProps, onSubmit, setValues } = useForm<FormValues>({
        initialValues,
        validate: zodResolver(schema),
    })

    const clearForm = () => setValues(initialValues)

    const submitUserForm = (values: FormValues) => {
        saveUser(values)
    }

    return (
        <Container>
            <Title mt="lg" mb="lg">
                Create User
            </Title>
            <form onSubmit={onSubmit(submitUserForm)}>
                <Stack>
                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                        <TextInput label="Full Name" {...getInputProps('name')} />
                        <PasswordInput label="Password" {...getInputProps('password')} />
                    </SimpleGrid>

                    <Grid>
                        <Grid.Col xs={12} lg={8}>
                            <TextInput label="Email" {...getInputProps('email')} />
                        </Grid.Col>
                    </Grid>

                    <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
                        <Select
                            label="Occupation"
                            disabled={isLoading}
                            data={(data?.occupations || []).map((occupation) => ({
                                label: occupation,
                                value: occupation,
                            }))}
                            {...getInputProps('occupation')}
                        />

                        <Select
                            label="State"
                            disabled={isLoading}
                            data={(data?.states || []).map((state) => ({
                                label: state.name,
                                value: state.abbreviation,
                            }))}
                            {...getInputProps('state')}
                        />
                    </SimpleGrid>

                    <Group position="right" mt="xl">
                        <Button variant="outline" onClick={clearForm}>
                            Cancel / Clear
                        </Button>
                        <Button type="submit" disabled={isSavingUser} loading={isSavingUser}>
                            Submit
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Container>
    )
}
