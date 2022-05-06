<template>
    <div class="indexlayout-main-conent">
        <StupBasicsForm></StupBasicsForm>
        <el-tabs type="border-card" v-model="showTabsVal">
            <el-tab-pane label="表单字段" name="TableFieldCreate">
                <TableFieldCreate v-if="showTabsVal == 'TableFieldCreate'"></TableFieldCreate>
            </el-tab-pane>
            <el-tab-pane label="列表配置" name="ListField">
                <ListField v-if="showTabsVal == 'ListField'"></ListField>
            </el-tab-pane>
            <el-tab-pane label="表单配置" name="FormFieldShow">表单配置</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, onMounted, reactive, ref, watch } from "vue";
import TableFieldCreate from "./components/TableFieldCreate.vue";
import StupBasicsForm from "./components/StupBasicsForm.vue";
import ListField from "./components/ListField.vue";

export default defineComponent({
    components: { TableFieldCreate, StupBasicsForm, ListField },
    setup() {
        const showTabsVal = ref<string>('TableFieldCreate')

        return {
            showTabsVal
        }
    },
});
</script>
