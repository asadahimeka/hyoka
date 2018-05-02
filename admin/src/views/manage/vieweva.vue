<template>
  <div>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-sub-header style="margin-left:-10px;">
          <h1>Evaluation</h1>
        </mu-sub-header>
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-table v-if="docked" class="mng__table" fixedHeader :showCheckbox="false" :selectable="false" ref="table">
          <mu-thead>
            <mu-tr>
              <mu-th>CNo</mu-th>
              <mu-th>CName</mu-th>
              <mu-th>SNo</mu-th>
              <mu-th>SName</mu-th>
              <mu-th>Remark</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>

            <mu-tr v-for="item in remarks" :key="item.id">
              <mu-td>{{item.cno}}</mu-td>
              <mu-td>{{item.cname}}</mu-td>
              <mu-td>{{item.sno}}</mu-td>
              <mu-td>{{item.sname}}</mu-td>
              <mu-td>{{item.remark}}</mu-td>
            </mu-tr>

          </mu-tbody>
        </mu-table>

        <h3 v-if="!loading&&!remarks.length" style="margin-top: 10vw;text-align:center;">暂无信息</h3>

        <div v-if="!docked" class="mng__list">
          <mu-list v-for="item in remarks" :key="item.id">
            <mu-sub-header inset>
              Remark
            </mu-sub-header>
            <div>
              <mu-list-item :title="item.cno+' '+item.remark" :describeText="item.sno">
                <mu-icon value="info_outline" slot="left" />
              </mu-list-item>
            </div>
          </mu-list>
        </div>
      </mu-col>
    </mu-row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      remarks: [],
      loading: true
    }
  },
  computed: {
    docked() {
      return this.$store.state['docked']
    }
  },
  async created() {
    try {
      this.$loading()
      let res = await this.$api.getRemarks()
      this.remarks = res.data.remarkss.edges
      this.remarks = this.remarks.map(e => e.node)
      this.loading = false
      this.$loading('close')
    } catch (err) {
      console.error(err)
      this.loading = false
      this.$loading('close')
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>