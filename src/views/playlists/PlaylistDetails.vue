<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <p>song list here</p>
    </div>
  </div>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import {computed} from 'vue'
import {useRouter} from 'vue-router'

export default {
  props: ['id'],
  setup(props) {
    const {error, document: playlist} = getDocument('playlists', props.id)
    const {user} = getUser()
    const {deleteDoc} = useDocument('playlists', props.id)
    const {deleteImage} = useStorage()
    const router = useRouter()

    const ownership = computed(() => {
      return (
        playlist.value && user.value && user.value.uid == playlist.value.userId
      )
    })

    const handleDelete = async () => {
      await deleteImage(playlist.value.filePath)
      await deleteDoc()
      router.push({name: 'Home'})
    }

    return {error, playlist, ownership, handleDelete}
  },
}
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.cover img {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  max-width: 150%;
  max-height: 150%;
}
.playlist-info {
  text-align: center;
}
.playlist-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.playlist-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
</style>