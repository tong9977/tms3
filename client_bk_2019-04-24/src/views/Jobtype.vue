<template>
    <v-layout>
      <feathers-vuex-find service="jobtype" :query="{JobTypeGroupID:41}" watch="query">
          <div slot-scope="props">
              <pre>{{props}}</pre>
              <p>มีทั้งหมด {{props.pagination.total}}</p>
          <ejs-grid ref="grid" :dataSource="props.items" height="280px"></ejs-grid>
          </div>
      </feathers-vuex-find>
    </v-layout>
</template>
