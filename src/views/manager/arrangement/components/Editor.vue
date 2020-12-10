<template>
  <el-col :span="20">
    <el-card class="box-card" body-style="height:100%">
      <el-row>
        <el-col :span="10">
          <h2>{{editorAction === 0 ? '添加' : '编辑'}}排片信息</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form label-width="80px" :model="item">
            <el-form-item  label="电影名称">
              <el-select @change="updateMovieId" v-model="item.movie_id" :placeholder="item.movie_name==null?'请选择':item.movie_name">
                <el-option v-for="o in movie" :key="o.id" :label="o.movie_name" :value="o.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="大厅名称">
              <el-select @change="updateHallId" v-model="item.hall_id" :placeholder="item.name==null?'请选择':item.name">
                <el-option v-for="o in hall" :key="o.id" :label="o.name" :value="o.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间">
              <div class="block">
                <el-date-picker
                  @change="updateStartStopTime"
                  v-model="startStopTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="价格">
              <el-input @input="updatePrice" :value="item.price"></el-input>
            </el-form-item>
          </el-form>
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
import { mapState, mapGetters } from "vuex";
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
      url: config.url + "/MovieInfo/SelectList.php",
      /* DATA */
      data: {},
      /* HEADER */
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.movie = res.data.list;
      console.log(this.item);
    });
    axios({
      /* METHOD POST */
      method: "POST",
      /* URI */
      url: config.url + "/HallInfo/SelectList.php",
      /* DATA */
      data: {},
      /* HEADER */
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      this.hall = res.data.list;
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
      hall: [],
      movie: [],
      startStopTime: []
    };
  },
  methods: {
    updateMovieId(e) {
      this.$store.commit("arrangement/SET_ARRANGEMENT_MOVIE_ID", e);
      console.log(this.item)
    },
    updateHallId(e) {
      this.$store.commit("arrangement/SET_ARRANGEMENT_HALL_ID", e);
    },
    updateStartStopTime(e) {
      this.updateStartTime(e[0]);
      this.updateStopTime(e[1])
      
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
          message: "编辑成功",
          type: "success"
        });
        this.$router.push({ path: "/Arrange/Selecting" });
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
        console.log(this.item)
        config.UpdateOne(this.entity, this.item, this.success);
      }
    },
    cancel() {
      this.$router.push({ path: "/Arrange/Selecting" });
    }
  }
};
</script>
