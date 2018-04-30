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
              <mu-th>Teacher</mu-th>
              <mu-th>TNo</mu-th>
              <mu-th>Department</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody>

              <mu-tr v-for="i in [0,1,2,3]" :key="i">
                <mu-td>C0001</mu-td>
                <mu-td>John Smith</mu-td>
                <mu-td>Employed</mu-td>
                <mu-td>Employed</mu-td>
                <mu-td>Employed</mu-td>
              </mu-tr>

          </mu-tbody>
        </mu-table>

        <div v-if="!docked" class="mng__list">
          <mu-list v-for="(list,ii) in [0,1]" :key="ii" @itemClick="openBottomSheet(ii)">
            <mu-sub-header inset>
              Folders
            </mu-sub-header>
            <div v-for="(item) in [0,1,2]" :key="item">
                <mu-list-item v-show="editing!=ii" title="Photos" describeText="Jan 20, 2014">
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
      adding: false,
      editing: -1,
      editIndex: -1,
      delText: 'Delete',
      options: {},
      bottomSheet: false,
      errorText: ''
    }
  },
  computed: {
    docked() {
      return this.$store.state['docked']
    }
  },
  created() {

  },
  methods: {
    add() {
      this.adding = true
    },
    doneAdd() {
      this.adding = false
      this.$popup('添加成功')
    },
    cancelAdd() {
      this.adding = false
    },
    edit(index) {
      if (this.docked) {
        if (~this.editing) return
        this.editing = index
        this.delText = 'Cancel'
      } else {
        this.editing = this.editIndex
        this.closeBottomSheet()
      }
    },
    doneEdit(index) {
      this.editing = -1
      this.delText = 'Delete'
      this.$popup('编辑成功')
    },
    cancelEdit() {
      this.editing = -1
      this.delText = 'Delete'
    },
    del() {
      this.$dialog({
        title: '删除',
        text: '确定要删除吗？',
        submitFn: () => {
          this.$popup('删除成功')
        }
      })
    },
    closeBottomSheet() {
      this.bottomSheet = false
    },
    openBottomSheet(index) {
      if (~this.editing) return
      this.editIndex = index
      this.bottomSheet = true
    }
  }
}
</script>

<style scoped>

</style>