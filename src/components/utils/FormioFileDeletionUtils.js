// Common OnChange Function for FORMIO forms
// Inputs
// e - event, instance - instance of the component, getter1 - filesUploaded variable, getter2 - fileKeys variable, setter1 - setter of filesUploaded, setter2 - setter of fileKeys, callback - callback function
export const FormCommonOnChange = (e, instance, getter1, getter2, setter1, setter2, callback = null) => {
    // Only Capturing File Uploads
    const isFileUpload = (
        e
        && e.changed
        && e.changed.instance
        && e.changed.value.length > 0
        && e.changed.instance.type === 'file'
    ) || false

    if (isFileUpload) {
        const isFileUrlType = e.changed.value[0].storage === 'url'
        if (isFileUrlType) {
            const filesUploaded = instance ? instance.state.filesUploaded : getter1
            let fileComponentKeys = instance ? instance.state.fileComponentKeys : getter2
            let currentFilesUploaded = new Set(filesUploaded)
            const fileUploadedComponentKey = e.changed.component.key

            if (fileComponentKeys.indexOf(fileUploadedComponentKey) === -1) {
                fileComponentKeys.push(fileUploadedComponentKey)
            }

            e.data[fileUploadedComponentKey]
                && Array.isArray(e.data[fileUploadedComponentKey])
                && e.data[fileUploadedComponentKey].length > 0
                && e.data[fileUploadedComponentKey].map(file => {
                    currentFilesUploaded.add(file.url)
                    return null
                })

            if (instance) {
                instance.setState({
                    filesUploaded: currentFilesUploaded,
                    fileComponentKeys,
                }, () => {
                    if (callback && typeof (callback) === 'function') callback()
                })
            } else {
                setter1(currentFilesUploaded)
                setter2(fileComponentKeys)
            }
        }
    }
}

// Inputs => fileKeys - Array, files - Set, data - Object (form data) 
// Output => Object of non-deleted files & deleted files
export const SeparateFiles = (fileKeys, files, data) => {
    let fileSetToBeRetained = new Set()
    let fileSetToBeDeleted = new Set(files)
    if (files.size > 0) {
        let exp1 = Object.keys(data).map(item => {
            if (fileKeys.indexOf(item) !== -1) {
                if (data[item]
                    && Array.isArray(data[item])
                    && data[item].length > 0) {
                    let exp2 = data[item].map(file => {
                        if (files.has(file.url)) {
                            fileSetToBeRetained.add(file.url)
                            fileSetToBeDeleted.delete(file.url)
                        }
                        return null
                    })
                }
            }
            return null
        })
    }

    return {
        fileSetToBeRetained,
        fileSetToBeDeleted
    }
}

// Inputs => fileSetToBeDeleted - A set contains the url of files to be deleted, savedLocalStorageData - localStorage data in the format of Object
export const StorageFileRemover = (fileSetToBeDeleted, savedLocalStorageData = null) => {
    if (fileSetToBeDeleted.size > 0) {
        fileSetToBeDeleted.forEach(url => {
            const modifiedUrl = url.substring(url.indexOf('/api'))
            const tokenName = window.location.pathname.startsWith('/org') ? 'token' : 'candidate_token'
            let token = ''
            if (savedLocalStorageData) token = savedLocalStorageData[tokenName]
            else token = localStorage.getItem(tokenName)
            fetch(modifiedUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `JWT ${token}`
                }
            })
        })
    }
}
