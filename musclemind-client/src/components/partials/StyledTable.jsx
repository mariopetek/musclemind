import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { styled } from '@mui/material/styles'

export const StyledTableBodyRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgb(241, 241, 241)'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 'none'
    }
}))

export const StyledTableHead = styled(TableHead)(() => ({
    color: 'rgba(89, 89, 89, 1)',
    borderBottom: '2px solid rgba(89, 89, 89, 1)'
}))

export const StyledTableHeadCell = styled(TableCell)(() => ({
    padding: '10px',
    color: 'rgba(89, 89, 89, 1)',
    fontWeight: 600,
    fontSize: '1rem',
    fontFamily: 'inherit',
    '& p': {
        margin: 0,
        marginLeft: '5px',
        display: 'inline-block'
    }
}))

export const StyledTableBodyCell = styled(TableCell)(() => ({
    padding: '10px',
    color: 'rgba(89, 89, 89, 1)',
    fontWeight: 500,
    fontFamily: 'inherit'
}))

export const StyledTableContainer = styled(TableContainer)(() => ({
    backgroundColor: 'white',
    border: '1px solid rgba(191, 191, 191, 1)',
    borderRadius: '8px '
}))
