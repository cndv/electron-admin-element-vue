
export interface FieldAssociationFormType {
  model: string; // 关联模型
  relation_key: string; // 关联键名:
  relation_list: any[]; // 多个关联字段
}

export interface FieldRuleFormType {
  validation_rules: string; // 验证规则
  validation_detailed: string; // 验证参数
  validation_scene: string; // 验证场景
  validation_alert_text: string; // 验证提示
}

export interface dbFieldsType {
  field_name: string,
  field_title: string,
  field_input_type: string,
  field_type: string,
  field_default_value: string,
  field_indexs: string,
  field_length: number,

  field_rule: FieldRuleFormType[], // 字段验证
  field_association: FieldAssociationFormType // 字段关联
}

export interface codeModelFieldType {
  id: number,
  project_info: {
    project_name: string,
    project_id: string,
    project_user_id: string,
  },
  data_conf: {
    db_title: string,
    db_name: string,
    db_model_name: string,
    db_controller_name: string,
    db_controller_dir: string,
    db_parent_menu: string
    db_fields: dbFieldsType[]
  },
  list_conf: Object,
  add_conf: Object,
  edit_conf: Object,
  other_conf: Object,
}