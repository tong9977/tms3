<script>
export default {
  mounted() {
    const roleId = this.$store.state.auth.user.RoleId;
    if (roleId === 1) {
      this.$router.push('/dashboard');
    }
    if (roleId === 2) {
      this.$router.push('/todaytrip');
    }
  }
};
</script>
  
  