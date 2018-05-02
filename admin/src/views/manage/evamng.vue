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
        <mu-raised-button @click="toggleAdd()" label="Add" icon="add_circle" secondary/>
        <transition name="slideDown" mode="out-in">
          <mu-table v-show="docked&&adding" fixedHeader :showCheckbox="false" :selectable="false" ref="table">
            <mu-thead>
              <mu-tr>
                <mu-th>No</mu-th>
                <mu-th>评价项</mu-th>
                <mu-th class="tac" style="color:green;">Done</mu-th>
                <mu-th class="tac" style="color:red;">Cancel</mu-th>
              </mu-tr>
            </mu-thead>
            <mu-tbody>

              <mu-tr>
                <mu-td>
                  <mu-text-field v-model="evnoA" fullWidth />
                </mu-td>
                <mu-td>
                  <mu-text-field v-model="evnameA" fullWidth />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:green;" icon="done" @click="doneAdd()" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button icon="cancel" style="color:red;" @click="cancelAdd()" />
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
            <div>
              <mu-text-field v-model="evnoA" icon="info" label="No" hintText="请输入" :errorText="errorText" labelFloat fullWidth/>
            </div>
            <div>
              <mu-text-field v-model="evnameA" icon="info" label="评价项" hintText="请输入" :errorText="errorText" labelFloat fullWidth/>
            </div>
          </mu-list>
        </transition>

        <h3 v-if="!loading&&!evas.length" style="margin-top: 10vw;text-align:center;">暂无信息</h3>

        <mu-table v-if="evas.length" class="mng__table" fixedHeader :showCheckbox="false" :selectable="false" ref="table">
          <mu-thead>
            <mu-tr>
              <mu-th>No</mu-th>
              <mu-th>评价项</mu-th>
              <mu-th class="tac" style="color:green;">Edit</mu-th>
              <mu-th class="tac" style="color:red;">{{delText}}</mu-th>
            </mu-tr>
          </mu-thead>
          <mu-tbody v-for="(item,index) in evas" :key="item.node.id">

            <transition name="td1" mode="out-in">
              <mu-tr v-show="editing!=index">
                <mu-td>{{item.node.evno}}</mu-td>
                <mu-td>{{item.node.name}}</mu-td>
                <mu-td class="tac">
                  <mu-icon-button icon="mode_edit" @click="edit(index)" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:red;" icon="delete" @click="del(item.node.id,index)" />
                </mu-td>
              </mu-tr>
            </transition>

            <transition name="td1" mode="out-in">
              <mu-tr v-show="editing==index">
                <mu-td>
                  {{item.node.evno}}
                </mu-td>
                <mu-td>
                  <mu-text-field v-model="evnameE" fullWidth/>
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:green;" icon="done" @click="doneEdit(index,item.node.id)" />
                </mu-td>
                <mu-td class="tac">
                  <mu-icon-button style="color:red;" icon="cancel" @click="cancelEdit()" />
                </mu-td>
              </mu-tr>
            </transition>

          </mu-tbody>
        </mu-table>

        <div v-if="!docked&&evas.length" class="mng__list">
          <mu-list v-for="(item,ii) in evas" :key="item.node.id" @itemClick="openBottomSheet(ii,item.node.id)">
            <mu-sub-header inset>
              评价项 {{item.node.evno}}
            </mu-sub-header>
            <mu-flexbox>
              <mu-flexbox-item class="tac">
                <mu-icon-button v-show="editing==ii" style="color:green;" icon="done" @click="doneEdit(ii,item.node.id)" />
              </mu-flexbox-item>
              <mu-flexbox-item class="tac">
                <mu-icon-button v-show="editing==ii" style="color:red;" icon="cancel" @click="cancelEdit()" />
              </mu-flexbox-item>
            </mu-flexbox>
            <div>
              <transition name="td1" mode="out-in">
                <mu-list-item v-show="editing!=ii" :title="item.node.name">
                  <mu-icon value="info_outline" slot="left" />
                </mu-list-item>
              </transition>
              <transition name="td1" mode="out-in">
                <mu-text-field v-show="editing==ii" icon="info" label="评价项" v-model="evnameE" hintText="请输入" :errorText="errorText" labelFloat fullWidth/>
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
        <mu-list-item title="Delete" @click="del(editId,editIndex)">
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
      loading: true,
      adding: false,
      editing: -1,
      editIndex: -1,
      editId: '',
      delText: 'Delete',
      options: {},
      bottomSheet: false,
      errorText: '',
      evas: [],
      evnoA: '',
      evnameA: '',
      evnoE: '',
      evnameE: ''
    }
  },
  computed: {
    docked() {
      return this.$store.state['docked']
    }
  },
  async created() {
    await this.getIndexs()
  },
  methods: {
    async getIndexs() {
      try {
        this.$loading()
        let res = await this.$api.getEvaIndex()
        this.evas = res.data.evas.edges
        this.loading = false
        this.$loading('close')
      } catch (err) {
        console.error(err)
        this.loading = false
        this.$loading('close')
      }
    },
    toggleAdd() {
      this.adding = !this.adding
    },
    async doneAdd() {
      if (!this.evnoA || !this.evnameA) {
        this.$popup('请输入内容')
        return
      }
      try {
        let res = await this.$api.addEvaIndex(this.evnoA, this.evnameA)
        let { id } = res.data.EvaAdd.evaEdge.node
        this.evas.push({
          node: {
            id,
            evno: this.evnoA,
            name: this.evnameA
          }
        })
        this.evnoA = ''
        this.evnameA = ''
        this.$popup('添加成功')
      } catch (err) {
        console.error(err)
      }
    },
    cancelAdd() {
      this.adding = false
    },
    edit(index) {
      this.evnoE = this.evas[index].node.evno
      this.evnameE = this.evas[index].node.name
      if (this.docked) {
        if (~this.editing) return
        this.editing = index
        this.delText = 'Cancel'
      } else {
        this.editing = this.editIndex
        this.closeBottomSheet()
      }
    },
    async doneEdit(index, id) {
      this.editing = -1
      this.delText = 'Delete'

      if (!this.evnameE) {
        this.$popup('请输入内容')
        return
      }
      try {
        let res = await this.$api.editEvaIndex(id, this.evnoE, this.evnameE)
        let { eva, error } = res.data.EvaEdit
        if (error) {
          this.$popup('编辑出错')
          return
        }
        this.evas[index].node.name = this.evnameE
        this.evnameE = ''
        this.$popup('编辑成功')
      } catch (err) {
        console.error(err)
      }
    },
    cancelEdit() {
      this.editing = -1
      this.delText = 'Delete'
    },
    del(id, index) {
      this.$dialog({
        title: '删除',
        text: '确定要删除吗？',
        submitFn: async () => {
          try {
            let res = await this.$api.del(id, 'eva')
            if (res.data.deleteMutation.error) {
              this.$popup('删除出错')
              return
            }
            this.evas.splice(index, 1)
            this.$popup('删除成功')
          } catch (err) {
            console.error(err)
          }
        }
      })
    },
    closeBottomSheet() {
      this.bottomSheet = false
    },
    openBottomSheet(index, id) {
      if (~this.editing) return
      this.editIndex = index
      this.editId = id
      this.bottomSheet = true
    }
  }
}
</script>

<style scoped>

</style>