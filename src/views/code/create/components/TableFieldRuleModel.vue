<template>
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :title="`[${dbFieldsType.field_name}] 表单验证规则`" width="500px" :model-value="visible" @close="onCancel">
        <template #footer>
            <el-button key="back" @click="() => resetFields()">取消</el-button>
            <el-button key="submit" type="primary" :loading="onSubmitLoading" @click="onFinish">提交</el-button>
        </template>

        <el-form :model="dynamicValidateForm" ref="formRef" label-width="80px">
            <div class="ds-mb-lg" v-for="(domain, index) in dynamicValidateForm.domains" :key="index">
                <div class="ds-text-md ds-pb-md ds-black ds-font-bold">
                    规则 {{index + 1}}
                </div>
                <el-form-item
                    label="验证规则"
                    :prop="'domains.' + index + '.validation_rules'"
                    :rules="{
                        required: true,
                        message: '必填',
                        trigger: 'change',
                    }"
                >
                    <el-select style="width: 100%" v-model="domain.validation_rules" placeholder="请选择">
                        <el-option v-for="(i, index) in statusSelect.fieldRule" :key="index" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="验证参数"
                    :prop="'domains.' + index + '.validation_detailed'"
                    :rules="{
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                    }"
                >
                    <el-input v-model="domain.validation_detailed" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item
                    label="验证场景"
                    :prop="'domains.' + index + '.validation_scene'"
                    :rules="{
                        required: true,
                        message: '必填',
                        trigger: 'change',
                    }"
                >
                    <el-select style="width: 100%" v-model="domain.validation_scene" placeholder="请选择">
                        <el-option v-for="(i, index) in statusSelect.fieldRuleScene" :key="index" :label="i.label" :value="i.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="验证提示"
                    :prop="'domains.' + index + '.validation_alert_text'"
                    :rules="{
                        required: true,
                        message: '必填',
                        trigger: 'blur',
                    }"
                >
                    <el-input v-model="domain.validation_alert_text" placeholder="请输入"></el-input>
                </el-form-item>
                <div class="ds-flex ds-justify-around">
                    <el-button-group>
                        <el-button @click="addDomain">新增</el-button>
                        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
                    </el-button-group>
                </div>
            </div>
        </el-form>
    </el-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm, ElMessage } from "element-plus";
import { dbFieldsType, FieldRuleFormType } from "../data.d";
import { useStore } from "vuex";
import { StateType as ListStateType } from "../store";
import status, { statusType } from "../status";

export default defineComponent({
    name: "TableFieldRuleModel",
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        onCancel: {
            type: Function,
            required: true,
        },
        rowIndex: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    components: {},
    setup(props) {
        const store = useStore<{
            CodeCreateStore: ListStateType;
        }>();
        const dbFieldsType = reactive<dbFieldsType>(store.state.CodeCreateStore.codeModelField.data_conf.db_fields[props.rowIndex]);
        const modelRef = reactive<FieldRuleFormType[]>(dbFieldsType.field_rule);

        // form
        const formRef = ref<typeof ElForm>();
        // 重置
        const resetFields = () => {
            formRef.value?.resetFields();

            props.onCancel();
        };
        // 提交
        const onSubmitLoading = ref<boolean>(false);
        const onFinish = async () => {
            try {
                const valid: boolean | undefined = await formRef.value?.validate();
                if (valid === true) {
                    console.log(dbFieldsType);

                    props.onCancel();
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        const dynamicValidateForm = reactive<{
            domains: FieldRuleFormType[];
        }>({
            domains: modelRef,
        });

        const removeDomain = (item: FieldRuleFormType) => {
            const index = dynamicValidateForm.domains.indexOf(item);
            if (dynamicValidateForm.domains.length > 1 && index !== -1) {
                dynamicValidateForm.domains.splice(index, 1);
            } else {
                ElMessage.warning("至少保留一行！");
            }
        };

        const addDomain = () => {
            dynamicValidateForm.domains.push({
                validation_rules: "", // 验证规则
                validation_detailed: "", // 验证参数
                validation_scene: "", // 验证场景
                validation_alert_text: "", // 验证提示
            });
        };

        const statusSelect = ref<statusType>(status);

        return {
            dbFieldsType,
            modelRef,
            formRef: formRef as unknown as typeof ElForm,
            resetFields,
            onFinish,
            onSubmitLoading,

            removeDomain,
            addDomain,
            dynamicValidateForm,

            statusSelect,
        };
    },
});
</script>
