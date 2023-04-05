import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const InputField = withStyles({
    root: {
        display: 'block',
        "& label": {
            color: 'rgba(89, 89, 89, 1)',
        },
        "& label.Mui-focused": {
            color: 'rgba(0, 149, 255, 1)'
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            display: 'block',
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: 'rgba(0, 149, 255, 1)'
            }
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(89, 89, 89, 1)',
        },
    }
})(TextField);

export default InputField
