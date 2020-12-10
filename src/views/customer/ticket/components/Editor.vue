<template>
  <el-col :span="20">
    <el-card class="box-card" body-style="height:100%">
      <el-row>
        <el-col :span="4">
          <h2>电影名称</h2>
        </el-col>
        <el-col :span="10">
          <h2>{{item.movie_name}}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h2>大厅</h2>
        </el-col>
        <el-col :span="10">
          <h2>{{item.name}}</h2>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="4">
          <h2>价格</h2>
        </el-col>
        <el-col :span="10">
          <h2 style="color:red;">{{item.price}}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h2>开场时间</h2>
        </el-col>
        <el-col :span="10">
          <h2>{{item.start_time}}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h2>结束时间</h2>
        </el-col>
        <el-col :span="10">
          <h2>{{item.stop_time}}</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <h2>选座</h2>
        </el-col>
        <el-col :span="10">
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/*鼠标悬浮时变色*/
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
.seat {
  width: 50px;
  height: 50px;
}
</style>
<script>
import config from "@/apis/config";
import { mapState, mapGetters } from "vuex";
import seat_normal from "@/assets/seat_demo.png";
import seat_select from "@/assets/seat_warning.png";
import seat_destory from "@/assets/seat_danger.png";
import seat_access from "@/assets/seat_success.png";
import axios from "axios";
export default {
  computed: mapState({
    ...mapGetters("arrangement", {
      item: "getArrangement"
    }),
    ...mapGetters("editor", {
      editorAction: "getEditorAction"
    })
  }),
  mounted() {
    axios({
      /* METHOD POST */
      method: "POST",
      /* URI */
      url: config.url + "/TicketInfo/GetTickets.php",
      /* DATA */
      data: {},
      /* HEADER */
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      let list = res.data.list;
      for (let i = 0; i < 70; i++) {
        let seat = new Object();
        seat.accessible = 1;
        seat.src = seat_normal;
        seat.seat_id = -1;
        this.seat.push(seat);
        
      }
      this.arrange_id = list[0].aid;
      for (let i = 0; i < list.length; i++) {
        let col = list[i].col;
        let row = list[i].row;
        let num = 7 * (row - 1) + col - 1;
        if (list[i].accessible) {
          this.seat[num].src = seat_access;
          this.seat[num].seat_id = list[i].id
        }
      }
    });
  },
  data() {
    return {
      entity: {
        entity: "ArrangementInfo",
        path: "/ArrangementInfo"
      },
      showPassword: true,
      imageUrl: "",
      seat: [],
      startStopTime: [],
      seatState: {
        normal: seat_normal,
        selected: seat_select,
        destoryed: seat_destory,
        access: seat_access
      },
      selected: [],
      arrange_id: 0
    };
  },
  methods: {
    seatSelected(e, i) {
      console.log(this.seat);
      if (e.target.src == seat_access) {
        e.target.src = this.seatState.destoryed;
        this.selected.push(this.seat[i].seat_id);
      } else if (e.target.src == seat_destory) {
        e.target.src = this.seatState.access;
        let index = this.selected.indexof(this.seat[i].seat_id);
        if (index > -1) {
          array.splice(index, 1);
        }
      }
    },
    updateStartTime(e) {
      this.$store.commit("arrangement/SET_ARRANGEMENT_START_TIME", e);
    },
    updateStopTime(e) {
      this.$store.commit("arrangement/SET_ARRANGEMENT_STOP_TIME", e);
    },
    updatePrice(e) {
      this.$store.commit("arrangement/SET_ARRANGEMENT_PRICE", e);
    },
    success(res) {
      if (res.data.executeState) {
        this.$notify({
          title: "成功",
          message: "购买成功",
          type: "success"
        });
        this.$router.push({ path: "/Ticket/Selecting" });
      } else {
        this.$notify({
          title: "失败",
          message: "编辑失败",
          type: "error"
        });
      }
    },
    confirm() {
      if (this.editorAction === 0) {
        config.InsertOne(this.entity, this.item, this.success);
      } else {
        for (let i = 0; i < this.selected.length; i++) {
          let data = new Object();
          data.seat_id = this.selected[i];
          data.user_id = 0;
          data.arrange_id = this.arrange_id;
          data.price= this.item.price;
          config.InsertOne({path:'/TicketInfo'}, data, this.success);
          console.log(data)
         // data.arrange_id = 
        }
      }
    },
    cancel() {
      this.$router.push({ path: "/Ticket/Selecting" });
    }
  }
};
</script>
