<template>
  <section style="width:80%; margin-left:100px; margin-top:50px">
  <h1>{{ title }}</h1>
  <el-table :data="tableData" :empty-text="emptyText" style="width:100%; margin-top:40px"> 
    <el-table-column type="selection" width="55" />
    <template v-for="value in filteredHeaderTable" :key="value">
        <el-table-column sortable :prop="value" :label="value" width="180"/>
    </template>
    <el-table-column align="right">
      <template #default="scope">
        <el-button type="primary" @click="openDrawer(scope.row)">Editer</el-button>
        <el-button type="danger" @click="displayModal(scope.row)">Supprimer</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="display:flex; justify-content: right; margin-top: 50px;">
    <el-button type="danger" @click="deleteData">Supprimer les données</el-button>
    <el-button type="primary" @click="exportData">Exporter en csv</el-button>
  </div>
</section>
</template>

<script setup lang="ts">

import { computed } from 'vue';

type Props = {
  tableData: any[];
  emptyText: string;
  title: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['openDrawerUpdate','displayModalDelete', 'deleteData']);

const filteredHeaderTable = computed(() => {
  if(props.tableData.length === 0) return [];
  const excludedKeys = ['_id', '__v'];
  const keys = Object.keys(props.tableData[0]);
  return keys.filter(
    (key) =>
      !excludedKeys.includes(key) &&
      !props.tableData.some((row) => {
        const value = row[key];
        return (
          typeof value === 'object' ||
          typeof value === 'boolean' ||
          Array.isArray(value) ||
          props.tableData.every((row) => !row[key])
        );
      })
  );

});

const openDrawer = (row: any) => {
  emit('openDrawerUpdate', row);
}

const displayModal = (row:any) => {
  emit('displayModalDelete', row);
}

const exportData = () =>{
  console.log("ok");
}

const deleteData = () => {
  console.log("ok");
}

</script>

<style scoped>
</style>