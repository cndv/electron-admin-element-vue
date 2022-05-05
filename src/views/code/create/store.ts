import { Mutation, Action, ActionObject } from 'vuex';
import { StoreModuleType } from "@/utils/store";
import { ResponseData } from '@/utils/request';
import { TableDataType, TableListItem, TableListQueryParams, codeModelFieldType } from './data.d';


export interface StateType {
    tableData: TableDataType;
    updateData: Partial<TableListItem>;
    codeModelField: codeModelFieldType,
}

export interface ModuleType extends StoreModuleType<StateType> {
    state: StateType;
    mutations: {
        setTableData: Mutation<StateType>;
        setUpdateData: Mutation<StateType>;

        addCodeModelFieldDbFields: Mutation<StateType>;
        removeCodeModelFieldDbFields: Mutation<StateType>;
    };
    actions: {
        queryTableData: Action<StateType, StateType>;
    };
}

export const dbFields = {
    field_title: '',
    field_name: '',
    field_input_type: '',
    field_type: '',
    field_default_value: '',
    field_indexs: '',

    field_rule: {
        validation_rules: '',
        validation_detailed: '', // 验证参数
        validation_scene: '', // 验证场景
        validation_alert_text: '',// 验证提示
    }
}

export const codeModelField = <codeModelFieldType>{
    id: 0,
    project_info: {
        project_name: '',
        project_id: '',
        project_user_id: '',
    },
    data_conf: {
        db_title: '文章管理',
        db_name: 'info',
        db_model_name: 'info',
        db_controller_name: 'infoController',
        db_controller_dir: '/controller/info',
        db_parent_menu: "",
        db_fields: [dbFields]
    },
    list_conf: {},
    add_conf: {},
    edit_conf: {},
    other_conf: {},
}

const initState: StateType = {
    tableData: {
      list: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
      },
    },
    updateData: {
        id: 1
    },

    codeModelField: codeModelField
};

const StoreModel: ModuleType = {
    namespaced: true,
    name: 'CodeCreateStore',
    state: {
        ...initState
    },
    mutations: {
        setTableData(state, payload) {
            state.tableData = payload;
        },
        setUpdateData(state, payload) {
            state.updateData = payload;
        },

        addCodeModelFieldDbFields(state, payload) {
            console.log("添加行", payload)
            state.codeModelField.data_conf.db_fields.push(payload);
        },
        removeCodeModelFieldDbFields(state, payload) {
            console.log("删除行", payload)
            
            state.codeModelField.data_conf.db_fields.splice(payload.index, 1);
        },
    },
    actions: {
        async queryTableData({ commit }, payload: any ) {
            console.log(commit)
        },
    }
};

export default StoreModel;
