import { OpenPanel } from '@openpanel/web';

interface InitOptions {
    // by default, tracking is only enabled in production (hyvor.com and its subdomains)
    // set this to true to force enable tracking in other environments (for testing purposes)
    // you might need allow that domain on OpenPanel to see the data
    forceTrack: boolean;

    // set a custom open panel API URL
    openPanelApiUrl?: string;

    // set a custom OpenPanel client ID
    openPanelClientId?: string;
}

class Track {

    private op: OpenPanel|undefined;

    private isProductionDomain(): boolean {
        const hostname = window.location.hostname;
        return hostname === 'hyvor.com' || hostname.endsWith('.hyvor.com');
    }

    init({
        forceTrack,
        openPanelApiUrl = 'https://op.hyvor.com/api',
        openPanelClientId = 'b11f6143-a6b0-4fa4-a86c-3969c01dbb1d'
    }: InitOptions) {

        if (!forceTrack && !this.isProductionDomain()) {
            console.log('Tracking is disabled in non-production domains.');
            return;
        }

        this.op = new OpenPanel({
            apiUrl: openPanelApiUrl,
            clientId: openPanelClientId,
            trackScreenViews: true,
            trackOutgoingLinks: true,
            trackAttributes: true,
        });

    }

    private checkOp() {
        if (!this.op) {
            throw new Error('OpenPanel is not initialized. Call track.init() first.');
        }
    }

    // set global context
    context(properties: Record<string, any>) {
        this.checkOp();
        this.op!.setGlobalProperties(properties);
    }

    // log an event
    event(name: string, properties?: Record<string, any>) {
        this.checkOp();
        this.op!.track(name, properties);
    }

    // identify user
    identify(profileId: string, props: {
        name?: string,
        avatar?: string,
        properties?: Record<string, any>
    }) {
        this.checkOp();
        this.op!.identify({
            profileId: profileId,
            firstName: props.name,
            avatar: props.avatar,
            properties: props.properties
        });
    }

    // log out user (clear identity)
    logout() {
        this.checkOp();
        this.op!.clear();
    }

}

const track = new Track();
export default track;