<template>
  <el-col :span="20">
    <el-card class="box-card" body-style="height:100%">
      <el-row>
        <el-col :span="10">
          <h1>{{editorAction === 0 ? '添加' : '编辑'}}大厅座位信息</h1>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form label-width="80px" :model="item">
            <el-form-item label="大厅名称">
              <el-input @input="updateName" :value="item.name"></el-input>
            </el-form-item>
            <el-form-item label="座位量">
              <el-input-number
                @change="updateNumber"
                v-model="item.total_seat"
                :min="1"
                :step="1"
                step-strictly
              ></el-input-number>
            </el-form-item>
          </el-form>
          <el-row>
            <img
              v-for="(item,index) in seat"
              :key="index"
              @click="seatSelected($event,index)"
              class="seat"
              :src="item.src"
            />
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-button @click="confirm" type="success">确认</el-button>
          <el-button @click="cancel" type="warning">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</template>
<style>
.seat {
  width: 50px;
  height: 50px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<script>
import config from "@/apis/config";
import seat_normal from "@/assets/seat_demo.png";
import seat_select from "@/assets/seat_warning.png";
import seat_destory from "@/assets/seat_danger.png";
import { mapState, mapGetters } from "vuex";
export default {
  computed: mapState({
    ...mapGetters("hall", {
      item: "getHallInfo"
    }),
    ...mapGetters("editor", {
      editorAction: "getEditorAction"
    })
  }),
  mounted() {
    config.GetPageInfo(
      { entity: "SeatInfo", path: "/SeatInfo" },
      { id: this.item.id },
      this.getSeats
    );
  },
  beforeCreate() {},
  data() {
    return {
      entity: {
        entity: "HallInfo",
        path: "/HallInfo"
      },
      showPassword: true,
      imageUrl: "",
      seatState: {
        normal: seat_normal,
        selected: seat_select,
        destoryed: seat_destory
      },
      seat: []
    };
  },
  methods: {
    showSrc(value) {
      console.log(value);
      switch (value) {
        case 0:
          return this.seatState.normal;
        case 1:
          return this.seatState.selected;
        case 2:
          return this.seatState.destoryed;
      }
    },
    seatSelected(e, i) {
      console.log(this.seat);
      if (e.target.src == seat_normal) {
        e.target.src = this.seatState.selected;
        this.seat[i].accessible = 1;
      } else if (e.target.src == seat_select) {
        e.target.src = this.seatState.destoryed;
        this.seat[i].accessible = 2;
      } else if (e.target.src == seat_destory) {
        e.target.src = this.seatState.normal;
        this.seat[i].accessible = 0;
      }
      console.log(this.seat);
    },
    getSeats(res) {
      console.log(res);
      let list = res.data.list;
      for (let i = 0; i < list.length; i++) {
        let seat = new Object();
        seat.accessible = list[i].accessible;
        if (list[i].accessible == 1) {
          seat.src = this.seatState.selected;
        } else if (list[i].accessible == 2) {
          seat.src = this.seatState.destoryed;
        } else if (list[i].accessible == 0) {
          seat.src = this.seatState.normal;
        }
        this.seat.push(seat);
      }
    },
    updateName(e) {
      this.$store.commit("hall/SET_HALL_NAME", e);
    },
    updateNumber(e) {
      this.$store.commit("hall/SET_TOTAL_SEAT", e);
    },
    success(res) {
      if (res.data.executeState) {
        this.$notify({
          title: "成功",
          message: "编辑成功",
          type: "success"
        });
        this.$router.push({ path: "/Seat/Selecting" });
      } else {
        this.$notify({
          title: "失败",
          message: "编辑失败",
          type: "error"
        });
      }
    },
    confirm() {
      console.log(this.editorAction);
      if (this.editorAction === 0) {
        config.InsertOne(this.entity, this.item, this.success);
      } else {
        config.UpdateOne(this.entity, this.item, () => {});
        config.DeleteOne(
          { entity: "SeatInfo", path: "/SeatInfo" },
          { id: this.item.id },
          this.success
        );
        for (let i = 0; i < 70; i++) {
          console.log(this.seat);
          let data = new Object();
          data.col = (i % 7) + 1; ////  1-7列
          data.row = parseInt(i / 7) + 1; ////  1-10排
          data.hall_id = this.item.id;
          data.accessible = this.seat[i].accessible;
          config.InsertOne(
            { entity: "SeatInfo", path: "/SeatInfo" },
            data,
            () => {}
          );
        }
      }
    },
    cancel() {
      this.$store.commit("hall/SET_HALL", {
        id: 0,
        name: "",
        total_seat: 0
      });
      this.$router.push({ path: "/Seat/Selecting" });
    }
  }
};
</script>
