<template>
  <section style="width:80%; margin:50px 0">
  <h1>{{ title }}</h1>
  <el-table :data="tableData" :empty-text="emptyText" style="width:100%; margin-top:40px" @selection-change="handleSelectionChange">
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

  <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="totalItems"
      @current-change="changePage"
      @size-change="changeSizePage"
      style="margin-top: 20px; text-align: right;"
    />

  <div style="display:flex; justify-content: right; margin-top: 50px;">
    <el-button type="primary" @click="exportData">Exporter en csv</el-button>
    <el-button type="danger" @click="deleteSelectedRows">Supprimer les données</el-button>
  </div>
</section>
</template>

<script setup lang="ts">

import { computed, ref, watch } from 'vue';
import toastHandler from '@/utils/toastHandler'
import { ToastType } from '@/utils/types/toast-type.enum'

type Props = {
  tableData: any[];
  emptyText: string;
  title: string;
  currentPage: number;
  pageSize: number;
  totalItems: number;
}



const props = defineProps<Props>();
const selectedRows = ref<string[]>([]);

const emit = defineEmits(['openDrawerUpdate','displayModalDelete', 'deleteSelectedData', 'changePage', 'changeSizePage']);

console.log('Props:', props);

const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection.map((row) => row._id);
  console.log(selectedRows.value);
}

const filteredHeaderTable = computed(() => {
  if(!props.tableData || props.tableData.length === 0) return [];
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

watch(() => props.tableData, (newValue) => {
  console.log('Table data:', newValue);
});

const openDrawer = (row: any) => {
  emit('openDrawerUpdate', row);
}

const displayModal = (row:any) => {
  emit('displayModalDelete', row);
}

const changePage = (page: number) => {
  emit('changePage', page);
}

const changeSizePage = (size: number) => {
  emit('changeSizePage', size);
}

const deleteSelectedRows = () => {

  if(selectedRows.value.length === 0){
    toastHandler('Veuillez selectionner des données à supprimer', ToastType.ERROR);
    return;
  }

  emit('deleteSelectedData', selectedRows.value);
}

const exportData = async () =>{
  if(selectedRows.value.length === 0){
    toastHandler('Veuillez selectionner des données à exporter', ToastType.ERROR);
    return;
  }
  
  if(!(window as any).showSaveFilePicker){
    toastHandler('Votre navigateur ne supporte pas cette fonctionnalité', ToastType.ERROR);
    return;
  }

  try{
    const headers = filteredHeaderTable.value.join(';');
    const rows = selectedRows.value.map((id) => {
      const row = props.tableData.find((row) => row._id === id);
      return filteredHeaderTable.value.map((key) => row[key]).join(';');
    });
    const csv = [headers, ...rows].join('\n');

    const date = new Date();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}-${date.getHours()}h${minutes}`;
    const fileName = `export-${dateString}.csv`;

    const fileHandle = await (window as any).showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: 'Fichier CSV',
          accept: {
            'text/csv': ['.csv'],
          },
        },
      ],
    });

    const writable = await fileHandle.createWritable();
    await writable.write(new TextEncoder().encode(csv));
    await writable.close();
    toastHandler('Données exportées avec succès', ToastType.SUCCESS);
  }
  catch(err){
    toastHandler('Erreur lors de l\'exportation des données', ToastType.ERROR);
  }
}

</script>

<style scoped>
</style>