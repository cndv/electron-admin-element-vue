export interface TableListQueryParams {
  page: number;
  per: number;
}

export interface PaginationConfig {
  total: number;
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
}

export interface TableListItem {
  id: number;
  name: string;
  desc: string;
  href: string;
  type: string;
}

export interface TableDataType {
  list: TableListItem[];
  pagination: PaginationConfig;
}

export interface codeModelFieldType {
  id: number,
  project_info: {
    project_name: String,
    project_id: String,
    project_user_id: String,
  },
  data_conf: {
    db_title: String,
    db_name: String,
    db_model_name: String,
    db_controller_name: String,
    db_controller_dir: String,
    db_parent_menu: String
    db_fields: Array
  },
  list_conf: Object,
  add_conf: Object,
  edit_conf: Object,
  other_conf: Object,
}