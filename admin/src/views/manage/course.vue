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
        <mu-raised-button @click="add()" label="Add" icon="add_circle" secondary/>
        <transition name="slideDown" mode="out-in">
          <mu-table v-show="adding" fixedHeader :showCheckbox="false" :selectable="false" ref="table">
            <mu-thead>
              <mu-tr>
                <mu-th>CNo</mu-th>
                <mu-th>CName</mu-th>
                <mu-th>Teacher</mu-th>
                <mu-th>TNo</mu-th>
                <mu-th>Department</mu-th>
                <mu-th class="tac" style="color:green;">Done</mu-th>
                <mu-th class="tac" style="color:red;">Cancel</mu-th>
              </mu-tr>
            </mu-thead>
            <mu-tbody>

              <mu-tr>
                <mu-td v-for="i in [0,1,2,3,4]" :key="i">
                  <mu-text-field fullWidth />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:green;" icon="done" @click="doneAdd()" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button icon="cancel" @click="cancelAdd()" />
                </mu-td>
              </mu-tr>
            </mu-tbody>
          </mu-table>
        </transition>

        <mu-table class="mng__table" fixedHeader :showCheckbox="false" :selectable="false" ref="table">
          <mu-thead>
            <mu-tr>
              <mu-th>CNo</mu-th>
              <mu-th>CName</mu-th>
              <mu-th>Teacher</mu-th>
              <mu-th>TNo</mu-th>
              <mu-th>Department</mu-th>
              <mu-th class="tac" style="color:green;">Edit</mu-th>
              <mu-th class="tac" style="color:red;">{{delText}}</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody v-for="(ii,index) in [0,1,2]" :key="ii">

            <transition name="td1" mode="out-in">
              <mu-tr v-show="editing!=index">
                <mu-td>C0001</mu-td>
                <mu-td>John Smith</mu-td>
                <mu-td>Employed</mu-td>
                <mu-td>Employed</mu-td>
                <mu-td>Employed</mu-td>
                <mu-td class="tac">
                  <mu-icon-button icon="mode_edit" @click="edit(index)" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:red;" icon="delete" @click="del()" />
                </mu-td>
              </mu-tr>
            </transition>

            <transition name="td1" mode="out-in">
              <mu-tr v-show="editing==index">
                <mu-td v-for="i in [0,1,2,3,4]" :key="i">
                  <mu-text-field fullWidth :value="i" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:green;" icon="done" @click="doneEdit(index)" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button icon="cancel" @click="cancelEdit()" />
                </mu-td>
              </mu-tr>
            </transition>

          </mu-tbody>
        </mu-table>

        <div v-if="!docked" class="mng__list">
          <mu-list>
            <mu-sub-header inset>Folders</mu-sub-header>
            <mu-list-item title="Photos" describeText="Jan 20, 2014">
              <mu-icon value="info" slot="left" />
            </mu-list-item>
            <mu-list-item title="Photos" describeText="Jan 20, 2014">
              <mu-icon value="info" slot="left" />
            </mu-list-item>
            <mu-list-item title="Photos">
              <mu-icon value="info" slot="left" />
            </mu-list-item>
          </mu-list>
        </div>
      </mu-col>
    </mu-row>
  </div>
</template>

<script>
import { showDialog } from '../../components/dialog'
import { showPopup } from '../../components/popup'
export default {
  name: 'Course',
  data() {
    return {
      adding: false,
      editing: -1,
      delText: 'Delete'
    }
  },
  computed: {
    docked() {
      return this.$store.state['docked']
    }
  },
  methods: {
    add() {
      this.adding = true
    },
    doneAdd() {
      this.adding = false
      showPopup('添加成功')
    },
    cancelAdd() {
      this.adding = false
    },
    edit(index) {
      this.editing = index
      this.delText = 'Cancel'
    },
    doneEdit(index) {
      this.editing = -1
      this.delText = 'Delete'
      showPopup('编辑成功')
    },
    cancelEdit() {
      this.editing = -1
      this.delText = 'Delete'
    },
    del() {
      showDialog({
        title: '删除',
        text: '确定要删除吗？',
        submitFn: () => {
          showPopup('删除成功')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>