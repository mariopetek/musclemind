import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const InputField = styled(TextField)(() => ({
    '& label': {
        color: 'rgba(89, 89, 89, 1)',
        '&.Mui-focused': {
            color: 'rgba(0, 149, 255, 1)'
        }
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(89, 89, 89, 1)'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 149, 255, 1)'
        }
    }
}))

export default InputField
