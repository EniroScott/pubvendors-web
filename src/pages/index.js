import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { useSnackbar } from 'material-ui-snackbar-provider'
import fileDownload from 'js-file-download'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MaterialTable from 'material-table'
import Layout from '../components/layout'

const useStyles = makeStyles(theme => ({
    result: {
        height: '100%',
        overflow: 'scroll',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    pubvendorsUrl: {
        width: 300,
    },
    orText: {
        display: 'inline',
        lineHeight: '4 !important',
        marginLeft: '10px !important',
        marginRight: '10px !important',
    },
}))

const IndexPage = () => {
    const publisherVendorsVersion = 1
    const classes = useStyles()
    const snackbar = useSnackbar()

    const [orig, setOrig] = React.useState({})
    const [version, setVersion] = React.useState(1)

    useEffect(() => {
        fetch('https://vendorlist.consensu.org/vendorlist.json')
            .then(res => res.json())
            .then(res => {
                setOrig(res)
                return null
            })
            .catch((e) => snackbar.showMessage(e.toString()))
    }, [])

    const createPubvendors = (data) => {
        const selected = []
        data.forEach((v) => selected.push(v.id))

        const vendors = orig.vendors.filter(v => selected.indexOf(v.id) !== -1)

        const pubvendors = {
            publisherVendorsVersion: parseInt(publisherVendorsVersion, 10),
            version: parseInt(version, 10),
            globalVendorListVersion: parseInt(orig.vendorListVersion, 10),
            updatedAt: new Date().toISOString(),
            vendors,
        }
        try {
            fileDownload(JSON.stringify(pubvendors), 'pubvendors.json')
        } catch (e) {
            snackbar.showMessage('Failed to save the file! Do you have permissions to save in that directory?')
        }
    }

    const setCurrentPubvendors = event => {
        setVersion(event.target.value)
    }

    let children = null

    if (!orig.vendors) {
        children = (
            <Grid
                className={classes.root}
                container
                spacing={2}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={6}>
                    <CircularProgress/>
                </Grid>
            </Grid>
        )
    } else {
        children = (
            <div>
                <Box marginTop={2}>
                    <Typography>
                        Check your existing pubvendors.json (should be at
                        https://www.example.com/.well-known/pubvendors.json), then add 1 to the "version". Select your
                        vendors from the table then click the download button at the top right of the table.
                    </Typography>
                </Box>
                <Box marginTop={2}>
                    <TextField
                        id="version"
                        label="New version"
                        type="number"
                        onChange={setCurrentPubvendors}
                        value={version}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </Box>
                <Box marginTop={2}>
                    {orig.vendors.length > 0 && (
                        <MaterialTable
                            title="Vendors"
                            columns={[
                                { title: 'id', field: 'id' },
                                { title: 'name', field: 'name' },
                                {
                                    title: 'purposeIds', field: 'purposeIds',
                                    render: rowData => rowData.purposeIds.join(','),
                                },
                                {
                                    title: 'legIntPurposeIds', field: 'legIntPurposeIds',
                                    render: rowData => rowData.legIntPurposeIds.join(','),
                                },
                                {
                                    title: 'featureIds', field: 'featureIds',
                                    render: rowData => rowData.featureIds.join(','),
                                },
                                { title: 'policyUrl', field: 'policyUrl' },
                            ]}
                            data={orig.vendors}
                            options={{
                                selection: true,
                                search: true,
                                pageSize: 12,
                                pageSizeOptions: [12, 24, 36],
                                searchFieldAlignment: 'left',
                            }}
                            actions={[
                                {
                                    tooltip: 'Download pubvendors.json',
                                    icon: 'cloud_download',
                                    onClick: (evt, data) => {
                                        createPubvendors(data)
                                    },
                                },
                            ]}/>
                    )}
                </Box>
            </div>
        )
    }

    return (
        <Layout>
            {children}
        </Layout>
    )
}

export default IndexPage
