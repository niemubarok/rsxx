<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No. RM</th>
          <th class="text-left">No. KTP</th>
          <th class="text-right">Nama Pasien</th>
          <th class="text-right">Alamat</th>
          <th class="text-right">Tanggal Lahir</th>
          <th class="text-right">Jenis Bayar</th>
          <!-- <th class="text-right">Tanggal Daftar</th> -->
        </tr>
      </thead>
      <tbody>
        <template v-for="row in rows" :key="row.no_rm">
          <tr>
            <td class="text-right">{{ row.no_rm }}</td>
            <td class="text-right">{{ row.no_ktp }}</td>
            <td class="text-right">{{ row.nama_pasien }}</td>
            <td class="text-right">{{ row.alamat }}</td>
            <td class="text-right">{{ row.tgl_lahir }}</td>
            <td class="text-right">{{ row.jenis_bayar }}</td>
          </tr>
        </template>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
export default {
  setup() {
    const rows = ref([]);
    onMounted(() => {
      axios.get("http://127.0.0.1:3333/patient/all").then((res) => {
        res.data.pasien.forEach((each) => {
          rows.value.push(each);
        });
      });
    });
    return { rows };
  },
};
</script>