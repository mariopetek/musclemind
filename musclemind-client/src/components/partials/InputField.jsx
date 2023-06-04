import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const InputField = styled(TextField)(() => ({
    '& label': {
        color: 'rgba(89, 89, 89, 1)',
        '&.Mui-focused': {
            color: 'rgba(0, 149, 255, 1)'
        },
        '&.Mui-error': {
            color: 'red'
        }
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        '.MuiOutlinedInput-notchedOutline': {
            transition: 'all 0.2s ease'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(89, 89, 89, 1)'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 149, 255, 1)'
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'red'
        }
    }
}))

export default InputField
