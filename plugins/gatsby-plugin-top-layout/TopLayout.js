import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme'
import { SnackbarProvider } from 'material-ui-snackbar-provider'
import favicon from './favicon.ico'

export default function TopLayout(props) {
    return (
        <React.Fragment>
            <Helmet>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                />
                <link rel="icon" href={favicon}/>
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Helmet>
            <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline/>
                    {props.children}
                </ThemeProvider>
            </SnackbarProvider>
        </React.Fragment>
    )
}

TopLayout.propTypes = {
    children: PropTypes.node,
}
