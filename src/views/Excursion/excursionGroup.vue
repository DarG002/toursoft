<template lang="pug">
  el-container
    el-main
      el-form(label-width="200px")
        el-form-item(label="Кол-во взрослых")
          el-input-number(v-model="person.adultCount", controls-position="right", :min="0", :max="300", size="small")
        el-form-item(label="Кол-во детей")
          el-input-number(v-model="person.childrenCount", controls-position="right", :min="0", :max="300", size="small")
        el-form-item(label="Кол-во младенцев")
          el-input-number(v-model="person.babyCount", controls-position="right", :min="0", :max="300", size="small")
        el-form-item(label="Предоплата")
          el-input-number(v-model="person.prepayment", controls-position="right", :precision="2" :step="0.1", :min="1", :max="99999", size="small")
        el-form-item(label="Остаток")
          el-input-number(v-model="person.leftToPay", controls-position="right", :precision="2" :step="0.1", :min="1", :max="99999", size="small")
        el-form-item(label="Фотосессия")
          el-switch(v-model="person.photoSession", active-text="Да", inactive-text="Нет", el-form-item, size="small")
        el-form-item(label="Отель")
          el-select(v-model="person.hotelId", filterable, placeholder="Select", size="small")
            el-option(
            v-for="item in hotels",
            :key="item.Id",
            :label="item.Name",
            :value="item.Id")
        el-form-item(label="Номера комнат")
          el-tag(
          :key="index",
          v-for="(tag, index) in person.hotelRoom",
          closable,
          :disable-transitions="false",
          @close="handleClose(tag)") {{ tag }}
          el-input.input-new-tag(
          v-if="inputVisible",
          v-model="inputValue",
          ref="saveTagInput",
          size="mini",
          @keyup.enter.native="handleInputConfirm",
          @blur="handleInputConfirm")
          el-button.button-new-tag(v-else, size="small", @click.stop="showInput") + Добавить
        el-form-item(label="Комментарий")
          el-input(v-model="person.comment", type="textarea")
        el-form-item(label="Время")
          el-date-picker(
          v-model="person.pickUpTime",
          type="datetime",
          placeholder="Select date and time",
          size="small")
</template>

<script>
  import { excursionGroup } from '@/api'
  import { mapGetters } from 'vuex'
  export default {
    name: 'AddTour',
    data() {
      return {
        excursionGroup: null,
        person: {
          adultCount: null,
          childrenCount: null,
          babyCount: null,
          prepayment: null,
          leftToPay: null,
          photoSession: true,
          hotelId: null,
          hotelRoom: [],
          comment: null,
          pickUpTime: null
        },
        hotels: null,
        inputVisible: false,
        inputValue: ''
      }
    },
    props: {
      data: {
        cb: {
          template: Function
        },
        excursionId: {
          template: Number,
          default: null
        }
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      handleClose(tag) {
        this.person.hotelRoom.splice(this.person.hotelRoom.indexOf(tag), 1)
      },
      showInput() {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleInputConfirm() {
        let inputValue = this.inputValue
        if (inputValue) {
          this.person.hotelRoom.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    },
    mounted() {
      excursionGroup({ method: 'get' }).then(({ data }) => {
        console.log(data)
      }).catch(err => {
        throw new Error(err)
      })
    }
  }
</script>

<style lang="scss" scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
