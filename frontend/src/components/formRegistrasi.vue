<template>
  <!-- <div class="q-pa-md"> -->
  <!-- <div class="q-gutter-y-md"> -->
  <q-card>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="pasienBaru" label="Pasien Baru" />
      <q-tab name="pasienLama" label="Pasien Lama" />
      <q-tab name="listTerdaftar" label="Pasien Terdaftar" />
      <q-tab name="jadwalDokter" label="Jadwal Dokter" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="pasienBaru">
        <div class="text-h6">Mails</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="pasienLama">
        <div class="text-h6">Alarms</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>

      <q-tab-panel name="listTerdaftar">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
      <q-tab-panel name="jadwalDokter">
        <div class="text-h6">Movies</div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("pasienLama"),
    };
  },
};
</script>
