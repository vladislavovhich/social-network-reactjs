import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateGroup, GroupRuleCreate } from "../../types/group.types";
import { createAppAsyncThunk, GetThunkState, ThunkType } from "../withTypes";
import { GroupApi } from "../../api/group-api";

interface State {
    groupName: string,
    groupCategory: string,
    groupCategories: string[],
    groupDescription: string,

    groupRules: GroupRuleCreate[],
    groupRuleHeader: string,
    groupRuleBody: string,

    commonError: string,
    createGroup: ThunkType
}

const state: State = {
    groupName: "",
    groupCategories: [],
    groupDescription: "",
    groupCategory: "",
    groupRules: [],
    groupRuleHeader: "",
    groupRuleBody: "",
    commonError: "",

    createGroup: GetThunkState()
}

export const createGroup = createAppAsyncThunk(
    "group-create/create",
    async (data: CreateGroup) => {
        await GroupApi.createGroup(data)
    }
)

export const groupCreateSlice = createSlice({
    name: 'group-create',
    initialState: state,
    reducers: {
        setCommonError(state, action: PayloadAction<string>) {
            state.commonError = action.payload
        },

        setRuleHeader(state, action: PayloadAction<string>) {
            state.groupRuleHeader = action.payload
        },

        setRuleBody(state, action: PayloadAction<string>) {
            state.groupRuleBody = action.payload
        },

        addRule(state, action: PayloadAction<Omit<GroupRuleCreate, 'order'>>) {
            const {header, body} = action.payload

            state.groupRules.push({
                order: (state.groupRules.length + 1).toString(),
                header,
                body
            })
        },

        removeRule(state, action: PayloadAction<number>) {
            state.groupRules = state.groupRules.filter((rule, index) => index != action.payload)
        },  

        setGroupCategory(state, action: PayloadAction<string>) {
            state.groupCategory = action.payload
        },

        setGroupName(state, action: PayloadAction<string>) {
            state.groupName = action.payload
        },

        setGroupDescription(state, action: PayloadAction<string>) {
            state.groupDescription = action.payload
        },

        addGroupCategory(state, action: PayloadAction<string>) {
            if (state.groupCategories.includes(action.payload)) {
                return
            }

            state.groupCategories.push(action.payload)
        },

        removeGroupCategory(state, action: PayloadAction<string>) {
            if (!state.groupCategories.includes(action.payload)) {
                return
            }

            state.groupCategories = state.groupCategories.filter(category => category != action.payload)
        }
    },

    extraReducers: builder => {
        builder

        .addCase(createGroup.pending, (state, action) => {
            state.createGroup.status = 'pending'
        })

        .addCase(createGroup.fulfilled, (state, action) => {
            state.createGroup.status = 'succeeded'
        })

        .addCase(createGroup.rejected, (state, action) => {
            state.createGroup.status = 'rejected'
            state.createGroup.error = action.error.message ?? 'Unknown Error'
        })
    }
})

export const {
    setRuleHeader, setRuleBody, addRule, removeRule, 
    setGroupCategory, setGroupName, setGroupDescription, 
    addGroupCategory, removeGroupCategory, setCommonError
} = groupCreateSlice.actions