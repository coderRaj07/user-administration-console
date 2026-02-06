import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userFields, userValidationSchema } from "../config/userSchema";
import type { User } from "../types/user";

interface Props {
    initialData?: User;
    onSubmit: (data: unknown) => void;
}

export default function UserForm({ initialData, onSubmit }: Props) {
    const { register, handleSubmit, formState } = useForm<Omit<User, "id">>({
        defaultValues: initialData,
        resolver: yupResolver(userValidationSchema as unknown as never),
    });



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                {userFields.map((field) => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        type={field.type}
                        {...register(field.name)}
                        error={!!formState.errors[field.name]}
                        helperText={formState.errors[field.name]?.message as string}
                        fullWidth
                    />
                ))}
                <Button variant="contained" type="submit">
                    {initialData ? "Update User" : "Create User"}
                </Button>
            </Stack>
        </form>
    );
}
