<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="formModel.nik"
        label="NIK *"
        type="number"
        hint="Masukan nomor KTP "
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Nomor KTP Masih Kosong']"
      />

      <q-input
        filled
        v-model="formModel.namaPasien"
        label="Nama Pasien *"
        hint="Masukan Nama Lengkap Pasien "
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Nama Lengkap Masih Kosong',
        ]"
      />

      <q-input
        filled
        v-model="formModel.tglLahir"
        hint="Masukan Tanggal Lahir Pasien"
        type="date"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Tanggal Lahir Kosong']"
      />

      <q-select
        v-model="formModel.jenisBayar"
        :options="options"
        label="Jenis Bayar"
      />

      <!-- :model-value="dokter.kodeDokter" -->
      <select>
        <template v-for="poli in resData" :key="poli">
          <option :value="poli.kode_poli">{{ poli.nama_dokter }}</option>
        </template>
      </select>

      <q-select
        :options="poli.namaPoli"
        v-model="poli.selectedPoli"
        label="Poli Tujuan"
        :option-label="(item) => (item === null ? null : item)"
      />
      <q-select
        v-if="poli.selectedPoli !== null"
        v-model="dokter.selectedDokter"
        :options="filterDokter().temp"
        :emit-value="true"
        label="Dokter Tujuan"
      />

      <q-input
        filled
        v-model="formModel.tglRegistrasi"
        hint="Pilih Tanggal Pendaftaran"
        type="date"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Tanggal Lahir Kosong']"
      />

      <!-- <q-toggle
        v-model="formModel.accept"
        label="I accept the license and terms"
      /> -->

      <div>
        <q-btn label="Simpan" @click="onSubmit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref, reactive, onMounted, onUpdated } from "vue";
import axios from "axios";

export default {
  setup() {
    const $q = useQuasar();
    const options = ["cash", "asuransi", "bpjs"];

    const formModel = reactive({
      nik: null,
      namaPasien: null,
      tglLahir: null,
      jenisBayar: null,
      tglRegistrasi: null,
    });

    const poli = reactive({
      selectedPoli: null,
      namaPoli: [],
    });

    const resData = ref([]);

    const dokter = reactive({
      selectedDokter: null,
      kodeDokter: null,
      namaDokter: [],
      kodePoli: null,
    });
    const filterDokter = () => {
      let temp = [];
      let tempKodeDokter = [];
      let tempKodePoli = [];
      resData.value.filter((dokter) => {
        if (dokter.clinic.nama_poli == poli.selectedPoli) {
          temp.push(dokter.nama_dokter);
          tempKodeDokter.push(dokter.kode_dokter);
          tempKodePoli.push(dokter.clinic.kode_poli);
        }
      });

      return {
        temp,
        tempKodeDokter,
        tempKodePoli,
      };
    };

    onMounted(() => {
      axios.get("http://127.0.0.1:3333/doctor/all").then((res) => {
        Object.values(res.data.doctor).forEach((each) => {
          resData.value.push(each),
            (dokter.kodeDokter = each.kode_dokter),
            dokter.namaDokter.push(each.nama_dokter),
            (dokter.kodePoli = each.kode_poli),
            poli.namaPoli.push(each.clinic.nama_poli);
        });
      });
    });

    // onUpdated(() => {
    //   console.log(dokter.filterDokter());
    // });
    return {
      formModel,
      options,
      dokter,
      poli,
      resData,
      filterDokter,

      onSubmit() {
          console.log(formModel.tglRegistrasi);

        axios
          .post("http://127.0.0.1:3333/patient/store", {
            noKtp: formModel.nik,
            namaPasien: formModel.namaPasien,
            jenisBayar: formModel.jenisBayar,
            tglLahir: formModel.tglLahir,
          })
          .then((res) => {
            axios
              .post("http://127.0.0.1:3333/registration/store", {
                noRm: res.data.data.noRm,
                kodeDokter: filterDokter().tempKodeDokter[0],
                kodePoli: filterDokter().tempKodePoli[0],
                tglRegistrasi: formModel.tglRegistrasi,
                namaPasien: formModel.namaPasien,
              })
              .then((res) => {
                console.log(res);
              });
            console.log(res);
          });
      },

      onReset() {
        formModel.nik = null;
        formModel.namaPasien = null;
        formModel.alamat = null;
        formModel.jenisBayar = null;
        formModel.tglLahir = null;
      },
    };
  },
};
</script>
