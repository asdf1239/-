<template>
  <el-col :span="20">
    <el-card class="box-card" body-style="height:100%">
      <el-row>
        <el-col :span="10">
          <h2>{{editorAction === 0 ? '添加' : '编辑'}}用户信息</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form label-width="80px" :model="item">
            <el-form-item label="昵称">
              <el-input @input="updateName" :value="item.nickname"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="性别">
              <el-switch
                v-model="item.gender"
                active-text="男"
                inactive-text="女"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </el-form-item>
            <el-form-item label="生日">
              <div class="block">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  @change="updateBirthday"
                  v-model="item.birthday"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="手机">
              <el-input @input="updatePhone" :value="item.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                @input="updatePassword"
                :show-password="showPassword"
                :value="item.password"
              ></el-input>
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
    ...mapGetters("user", {
      item: "getUser"
    }),
    ...mapGetters("editor", {
      editorAction: "getEditorAction"
    })
  }),
  mounted() {
    console.log(this.user);
  },
  data() {
    return {
      entity: {
        entity: "UserInfo",
        path: "/UserInfo"
      },
      showPassword: true,
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.updateAvatar(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    updateName(e) {
      this.$store.commit("user/SET_USER_INFO_NICKNAME", e);
    },
    updateAvatar(e) {
      this.$store.commit("user/SET_USER_INFO_AVATAR", e);
    },
    updateGender(e) {
      this.$store.commit("user/SET_USER_INFO_GENDER", e);
    },
    updateBirthday(e) {
      this.$store.commit("user/SET_USER_INFO_BIRTHDAY", e);
    },
    updatePhone(e) {
      this.$store.commit("user/SET_USER_INFO_PHONE", e);
    },
    updatePassword(e) {
      this.$store.commit("user/SET_USER_INFO_PASSWORD", e);
    },
    success(res) {
      if (res.data.executeState) {
        this.$notify({
          title: "成功",
          message: "编辑成功",
          type: "success"
        });
        this.$router.push({ path: "/VIP/Selecting" });
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
        this.$store.commit("user/SET_USER_INFO_ROLE", 2);
        config.InsertOne(this.entity, this.item, this.success);
      } else {
        config.UpdateOne(this.entity, this.item, this.success);
      }
    },
    cancel() {
      this.$store.commit("user/SET_USER", {
        nickname: "",
        avatar: "",
        gender: 0,
        birthday: "",
        phone: "",
        password: "",
        id: 0,
        role: 0
      });
      this.$router.push({ path: "/VIP/Selecting" });
    }
  }
};
</script>
