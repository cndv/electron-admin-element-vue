interface statusItem {
    label: string;
    value: string;
}

export interface statusType {
    inputType: statusItem[];
    fieldType: statusItem[];
    defaultType: statusItem[];
    indexsType: statusItem[];
}

const status = <statusType>{
    inputType: [
        {
            label: '普通输入框',
            value: 'input'
        },
        {
            label: '密码输入框',
            value: 'password'
        },
        {
            label: '多行文本框',
            value: 'textarea'
        },
        {
            label: '数字输入框',
            value: 'number'
        },
        {
            label: '单选框',
            value: 'radio'
        },
        {
            label: '下拉输入框',
            value: 'select'
        },
        {
            label: '多选框',
            value: 'checkbox'
        },
        {
            label: '日期选择框',
            value: 'date'
        },
        {
            label: '时间选择框',
            value: 'datetime'
        },
    ],
    fieldType: [
        {
            label: 'int',
            value: 'int'
        },
        {
            label: 'varchar',
            value: 'varchar'
        },
        {
            label: 'decimal',
            value: 'decimal'
        },
        {
            label: 'float',
            value: 'float'
        },
        {
            label: 'text',
            value: 'text'
        }
    ],
    defaultType: [
        {
            label: '0',
            value: '0'
        },
        {
            label: 'null',
            value: 'null'
        }
    ],
    indexsType: [
        {
            label: 'FULLTEXT',
            value: 'FULLTEXT'
        },
        {
            label: 'NORMAL',
            value: 'NORMAL'
        },
        {
            label: 'SPATIAL',
            value: 'SPATIAL'
        },
        {
            label: 'UNIQUE',
            value: 'UNIQUE'
        }
    ]
}

export default status