import { UserForm } from './features/users/UserForm'

function App() {
    return (
        <>
            <UserForm
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    occupation: '',
                    state: '',
                }}
            />
        </>
    )
}

export default App
