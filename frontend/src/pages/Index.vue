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
      <q-tab name="ListPasien" label="List Pasien" />
      <q-tab name="ListPendaftaran" label="List Pendaftaran" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="pasienBaru">
        <pasien-baru />
      </q-tab-panel>

      <q-tab-panel name="pasienLama">
        <pasien-lama />
      </q-tab-panel>

      <q-tab-panel name="ListPasien">
        <list-pasien />
      </q-tab-panel>
      <q-tab-panel name="ListPendaftaran">
        <list-pendaftaran />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
  <!-- </div> -->
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";
import PasienBaru from "src/components/PasienBaru.vue";
import PasienLama from "src/components/PasienLama.vue";
import ListPendaftaran from "src/components/ListPendaftaran.vue";
import ListPasien from "src/components/ListPasien.vue";

export default {
  components: { PasienBaru, PasienLama, ListPendaftaran, ListPasien },
  setup() {
    return {
      tab: ref("pasienLama"),
    };
  },
};
</script>
