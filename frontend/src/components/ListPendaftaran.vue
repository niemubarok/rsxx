<template>
  <div class="q-pa-md">
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">No. RM</th>
          <th class="text-right">Nama Pasien</th>
          <th class="text-right">Poli</th>
          <th class="text-right">Dokter</th>
          <th class="text-right">Antrian</th>
          <th class="text-right">Tanggal Daftar</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="row in rows" :key="row.id">
          <tr>
            <td class="text-left">
              {{ row.patient.no_rm }}
            </td>
            <td class="text-right">{{ row.patient.nama_pasien }}</td>
            <td class="text-right">{{ row.clinic.nama_poli }}</td>
            <td class="text-right">{{ row.doctor.nama_dokter }}</td>
            <td class="text-right">{{ row.no_antrian }}</td>
            <td class="text-right">{{ row.tgl_registrasi }}</td>
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
      axios.get("http://127.0.0.1:3333/registration/all").then((res) => {
        res.data.registration.forEach((each) => {
          rows.value.push(each);
        });
      });
    });
    return { rows };
  },
};
</script>