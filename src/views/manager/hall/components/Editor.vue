<template>
  <el-col :span="20">
    <el-card class="box-card" body-style="height:100%">
      <el-row>
        <el-col :span="10">
          <h1>{{editorAction === 0 ? '添加' : '编辑'}}大厅信息</h1>
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
  },
  data() {
    return {
      entity: {
        entity: "HallInfo",
        path: "/HallInfo"
      },
      showPassword: true,
      imageUrl: ""
    };
  },
  methods: {
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
        this.$router.push({ path: "/Hall/Selecting" });
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
        console.log(1111)
        config.InsertOne(this.entity, this.item, this.success);
      } else {
        config.UpdateOne(this.entity, this.item, this.success);
      }
    },
    cancel() {
      this.$store.commit("hall/SET_HALL", {
        id: 0,
        name: "",
        total_seat: 0
      });
      this.$router.push({ path: "/Hall/Selecting" });
    }
  }
};
</script>
