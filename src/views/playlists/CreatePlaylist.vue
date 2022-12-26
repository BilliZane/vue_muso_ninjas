<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create new PlayList</h4>
    <input type="text" placeholder="Playlists title" required v-model="title" />
    <textarea
      placeholder="Playlist description..."
      required
      v-model="description"
    ></textarea>
    <!-- upload playlist image -->
    <label for="upload-file">Upload playlist cover image</label>
    <input type="file" id="upload-file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending" type="submit" :disabled="!file">Create</button>
    <button v-else type="submit" :disabled="!file">Saving...</button>
  </form>
</template>
<script>
import {ref} from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import {timestamp} from '@/firebase/config'
import {useRouter} from 'vue-router'
export default {
  setup() {
    const router = useRouter()

    const {filePath, url, uploadImage} = useStorage()
    const {error, addDoc} = useCollection('playlists')
    const {user} = getUser()

    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
        console.log('image uploaded, url:', url.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp(),
        })
        isPending.value = false

        if (!error.value) {
          router.push({name: 'PlaylistDetails', params: {id: res.id}})
          console.log('playlist added')
        }

        title.value = ''
        description.value = ''
        file.value = null
      }
    }

    // allowed file types
    const types = ['image/png', 'image/jpeg', 'image/jpg']

    const handleChange = (e) => {
      const selected = e.target.files[0]

      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpeg).'
      }
      console.log(file.value)
    }

    return {
      title,
      description,
      file,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
    }
  },
}
</script>

<style>
input[type='file'] {
  border: 0;
  padding: 0;
  margin-top: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>
