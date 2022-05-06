<template>
    <el-select v-model="value" clearable>
        <!-- <el-option label="请选择" value="" disabled></el-option> -->
        <el-option label="信息" value="1"></el-option>
        <el-option label="用户" value="2"></el-option>
    </el-select>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

interface TypeSelectSetupData {
    value?: string;
}

export default defineComponent({
    name: 'MenuSelect',
    props: {
        modelValue: {
            type: String,
            default: ""
        },
    },
    setup(props, { emit }): TypeSelectSetupData {

        // 数据值
        const value = computed<string>({
            get: () => props.modelValue,
            set: val => {
                console.log(val)          
                emit('update:modelValue', val || '');
            }
        });

        return {
            value: value as unknown as string
        }

    }
})
</script>