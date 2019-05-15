<script>
export default {
  mounted() {
    const roleId = this.$store.state.auth.user.RoleId;
    const userId = this.$store.state.auth.user.Id;
    if (roleId === 1) {
      this.$router.push('/dashboard');
    }
    if (roleId === 2) {
      this.$router.push('/mytripmobile/'+userId);
    }
  }
};
</script>
  
  