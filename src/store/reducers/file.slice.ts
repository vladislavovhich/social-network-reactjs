import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type FileManyType = {
    file: string
    id: string
    preview: string
}

interface State {
    fileOne: string | null
    fileMany: FileManyType[]
    fileOnePreview: string
}

const state: State = {
    fileOne: null,
    fileOnePreview: "",
    fileMany: [],
}

export const fileSlice = createSlice({
    name: "file",
    initialState: state,
    reducers: {
        setOneFile(state, action: PayloadAction<{file: string | null, preview: string}>) {
            const {file, preview} = action.payload

            state.fileOnePreview = preview
            state.fileOne = file
        },

        setManyFile(state, action: PayloadAction<{file: string, id?: string, preview: string}>) {
            const {file, id, preview} = action.payload

            if (id) {
                const index = state.fileMany.findIndex(item => item.id == id)
                
                if (!index) {
                    return
                }

                state.fileMany[index].file = file
                state.fileMany[index].preview = preview
            }

            state.fileMany.push({id: Date.now().toString(), file, preview})
        },

        removeManyFile(state, action: PayloadAction<string>) {
            const id = action.payload
            const found = state.fileMany.find(item => item.id == id)

            if (!found) {
                return
            }

            state.fileMany = state.fileMany.filter(item => item.id != id)
        }
    }
})

export const {setOneFile, setManyFile, removeManyFile} = fileSlice.actions