<template>
    <el-card shadow="never" class="cus-card">
        <ListFieldSearch></ListFieldSearch>
        <el-table :border="true" row-key="id" :data="[1]" v-loading="tableLoading">
            <el-table-column v-for="(item, index) in resetTableList" width="140" :key="index" :label="item.title">
                <template #default>
                    {{ item.value }}
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, onMounted, reactive, ref } from "vue";
import { StateType as ListStateType } from "../store";
import { dbFieldsType } from "../data.d";
import status, { statusType } from "../status";
import ListFieldSearch from "./ListFieldSearch.vue";

interface resetTableRow {
    title?: string,
    value?: string
}

export default defineComponent({
    name: "ListField",
    setup() {
        const store = useStore<{
            CodeCreateStore: ListStateType;
        }>();
        const tableLoading = ref<boolean>(false);
        const tableList = reactive<dbFieldsType[]>(store.state.CodeCreateStore.codeModelField.data_conf.db_fields);
        const statusSelect = ref<statusType>(status);
        let resetTableList = reactive<resetTableRow[]>([]);
        for (let key in tableList) {
            let item = tableList[key];
            if (item.field_name) {
                const items = {
                    title: `${item.field_title} (${item.field_name})`,
                    value: `${item.field_type} (${item.field_length})`,
                } as resetTableRow;
                resetTableList.push(items);
            }
        }
        return {
            tableLoading,
            tableList,
            statusSelect,
            resetTableList,
        };
    },
    components: { ListFieldSearch }
});
</script>

<style lang="sass" scoped></style>
