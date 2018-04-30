<template>
  <div>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-sub-header style="margin-left:-10px;">
          <h1>Teacher</h1>
        </mu-sub-header>
      </mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="100" tablet="100" desktop="100">
        <mu-raised-button @click="add()" label="Add" icon="add_circle" secondary/>
        <transition name="slideDown" mode="out-in">
          <mu-table v-show="docked&&adding" fixedHeader :showCheckbox="false" :selectable="false" ref="table">
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
        <transition name="slideDown" mode="out-in">
          <mu-list v-show="!docked&&adding">
            <mu-flexbox>
              <mu-flexbox-item class="tac">
                <mu-icon-button style="color:green;" icon="done" @click="doneAdd()" />
              </mu-flexbox-item>
              <mu-flexbox-item class="tac">
                <mu-icon-button icon="cancel" style="color:red;" @click="cancelAdd()" />
              </mu-flexbox-item>
            </mu-flexbox>
            <div v-for="(item) in [0,1,2]" :key="item">
              <mu-text-field icon="info" label="label" hintText="请输入" :errorText="errorText" labelFloat fullWidth/>
            </div>
          </mu-list>
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
          <mu-list v-for="(list,ii) in [0,1]" :key="ii" @itemClick="openBottomSheet(ii)">
            <mu-sub-header inset>
              Folders
            </mu-sub-header>
            <mu-flexbox>
              <mu-flexbox-item class="tac">
                <mu-icon-button v-show="editing==ii" style="color:green;" icon="done" @click="doneEdit(ii)" />
              </mu-flexbox-item>
              <mu-flexbox-item class="tac">
                <mu-icon-button v-show="editing==ii" style="color:red;" icon="cancel" @click="cancelEdit()" />
              </mu-flexbox-item>
            </mu-flexbox>
            <div v-for="(item) in [0,1,2]" :key="item">
              <transition name="td1" mode="out-in">
                <mu-list-item v-show="editing!=ii" title="Photos" describeText="Jan 20, 2014">
                  <mu-icon value="info_outline" slot="left" />
                </mu-list-item>
              </transition>
              <transition name="td1" mode="out-in">
                <mu-text-field v-show="editing==ii" icon="info" label="label" hintText="请输入" :errorText="errorText" labelFloat fullWidth/>
              </transition>
            </div>
          </mu-list>
        </div>
      </mu-col>
    </mu-row>

    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list @itemClick="closeBottomSheet">
        <mu-sub-header>
          Action
        </mu-sub-header>
        <mu-list-item title="Edit" @click="edit(editIndex)">
          <mu-icon value="edit" color="green" slot="left" />
        </mu-list-item>
        <mu-list-item title="Delete" @click="del()">
          <mu-icon value="delete" color="red" slot="left" />
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>

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