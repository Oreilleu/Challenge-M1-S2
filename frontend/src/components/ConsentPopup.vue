<template>
    <Transition name="fade">
        <div v-if="isVisible" class="cookie-consent">
            <div class="cookie-content">
                <h2 class="cookie-title">Gérer vos préférences de cookies</h2>

                <p class="cookie-text">
                    Nous utilisons des cookies pour améliorer votre expérience sur notre site, personnaliser
                    les contenus, et analyser le trafic. Vous pouvez accepter ou refuser les cookies à tout
                    moment.
                </p>

                <div class="cookie-options" v-if="showPreferences">
                    <div class="cookie-option">
                        <input type="checkbox" id="essential" v-model="preferences.essential" disabled checked />
                        <label for="essential">
                            <strong>Cookies essentiels</strong>
                            <span>Nécessaires au fonctionnement du site (toujours actifs)</span>
                        </label>
                    </div>

                    <div class="cookie-option">
                        <input type="checkbox" id="analytics" v-model="preferences.analytics" />
                        <label for="analytics">
                            <strong>Cookies analytiques</strong>
                            <span>Pour analyser l'utilisation du site et améliorer nos services</span>
                        </label>
                    </div>

                    <div class="cookie-option">
                        <input type="checkbox" id="marketing" v-model="preferences.marketing" />
                        <label for="marketing">
                            <strong>Cookies marketing</strong>
                            <span>Pour personnaliser les publicités selon vos centres d'intérêt</span>
                        </label>
                    </div>
                </div>

                <div class="cookie-actions">
                    <template v-if="!showPreferences">
                        <button class="btn btn-primary" @click="acceptAll">Accepter tout</button>
                        <button class="btn btn-secondary" @click="rejectAll">Refuser tout</button>
                        <button class="btn btn-outline" @click="togglePreferences">Paramétrer mes choix</button>
                    </template>
                    <template v-else>
                        <button class="btn btn-primary" @click="savePreferences">Enregistrer mes choix</button>
                        <button class="btn btn-outline" @click="goBack">Retour</button>
                    </template>
                </div>

                <div class="cookie-footer">
                    <RouterLink to="/condition-users" class="privacy-link">
                        Consulter nos Conditions Générales d'Utilisation
                    </RouterLink>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isVisible = ref(false)
const showPreferences = ref(false)

const preferences = reactive({
    essential: true,
    analytics: false,
    marketing: false
})

onMounted(() => {
    // Vérifie si les préférences ont déjà été définies
    const savedPreferences = localStorage.getItem('cookiePreferences')
    const hasConsented = localStorage.getItem('hasConsented')

    if (!hasConsented) {
        isVisible.value = true
    } else if (savedPreferences) {
        const parsed = JSON.parse(savedPreferences)
        Object.assign(preferences, parsed)
    }
})

const acceptAll = () => {
    preferences.analytics = true
    preferences.marketing = true
    saveCookiePreferences()
    closePopup()
}

const rejectAll = () => {
    preferences.analytics = false
    preferences.marketing = false
    saveCookiePreferences()
    closePopup()
}

const togglePreferences = () => {
    showPreferences.value = true
}

const goBack = () => {
    showPreferences.value = false
}

const savePreferences = () => {
    saveCookiePreferences()
    closePopup()
}

const closePopup = () => {
    isVisible.value = false
    localStorage.setItem('hasConsented', 'true')
}

const saveCookiePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
    const event = new CustomEvent('cookiePreferencesUpdated', {
        detail: preferences
    })
    window.dispatchEvent(event)
}
</script>

<style>
.cookie-consent {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    padding: 1rem;
}

.cookie-content {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid rgb(193, 193, 193);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.cookie-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
}

.cookie-text {
    color: #5c6c7c;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

.cookie-options {
    margin: 1.5rem 0;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.25rem;
    background: #f8f9fa;
}

.cookie-option {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
    padding: 0.5rem;
}

.cookie-option:last-child {
    margin-bottom: 0;
}

.cookie-option input[type='checkbox'] {
    margin-right: 1rem;
    margin-top: 0.25rem;
}

.cookie-option label {
    display: flex;
    flex-direction: column;
}

.cookie-option label strong {
    display: block;
    margin-bottom: 0.25rem;
    color: #2c3e50;
}

.cookie-option label span {
    font-size: 0.9rem;
    color: #5c6c7c;
}

.cookie-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
}

.btn {
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    font-size: 0.95rem;
}

.btn-primary {
    background: #3b82f6;
    color: white;
}

.btn-primary:hover {
    background: #2563eb;
}

.btn-secondary {
    background: #94a3b8;
    color: white;
}

.btn-secondary:hover {
    background: #64748b;
}

.btn-outline {
    background: transparent;
    border: 2px solid #94a3b8;
    color: #64748b;
}

.btn-outline:hover {
    background: #f1f5f9;
    border-color: #64748b;
}

.cookie-footer {
    margin-top: 1.5rem;
    text-align: center;
}

.privacy-link {
    color: #64748b;
    text-decoration: underline;
    font-size: 0.9rem;
}

.privacy-link:hover {
    color: #475569;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>