<template>
  <div>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-sub-header style="margin-left:-10px;">
          <h1>Course</h1>
        </mu-sub-header>
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-raised-button label="unselect" @click="unselect" />
        <mu-table v-if="docked" multiSelectable enableSelectAll ref="table">
          <mu-thead>
            <mu-tr>
              <mu-th>ID</mu-th>
              <mu-th>Name</mu-th>
              <mu-th>Status</mu-th>
              <mu-th>Status</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>
            <mu-tr>
              <mu-td>1</mu-td>
              <mu-td>John Smith</mu-td>
              <mu-td>Employed</mu-td>
              <mu-td>Employed</mu-td>
            </mu-tr>
            <mu-tr>
              <mu-td>2</mu-td>
              <mu-td>Randal White</mu-td>
              <mu-td>Unemployed</mu-td>
              <mu-td>Unemployed</mu-td>
            </mu-tr>
            <mu-tr>
              <mu-td>3</mu-td>
              <mu-td>Stephanie Sanders</mu-td>
              <mu-td>Employed</mu-td>
              <mu-td>Employed</mu-td>
            </mu-tr>
            <mu-tr>
              <mu-td>4</mu-td>
              <mu-td>Steve Brown</mu-td>
              <mu-td>Employed</mu-td>
              <mu-td>Employed</mu-td>
            </mu-tr>
          </mu-tbody>
        </mu-table>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  name: 'Course',
  data() {
    return {

    }
  },
  computed: {
    docked() {
      return this.$store.state['docked']
    }
  }
}
</script>

<style scoped>

</style>