import { OpenPanel } from '@openpanel/web';

interface InitOptions {
    // by default, tracking is only enabled in production (hyvor.com and its subdomains)
    // set this to true to force enable tracking in other environments (for testing purposes)
    // you might need allow that domain on OpenPanel to see the data
    forceTrack?: boolean;

    // set a custom open panel API URL
    openPanelApiUrl?: string;

    // set a custom OpenPanel client ID
    openPanelClientId?: string;

    // initial global context properties
    // recommended to set product name here (component: relay)
    context?: Record<string, any>;
}

class Track {

    private op: OpenPanel|undefined;

    private isProductionDomain(): boolean {
        const hostname = window.location.hostname;
        return hostname === 'hyvor.com' || hostname.endsWith('.hyvor.com');
    }

    init({
        forceTrack = false,
        openPanelApiUrl = 'https://op.hyvor.com/api',
        openPanelClientId = 'b11f6143-a6b0-4fa4-a86c-3969c01dbb1d',
        context = {}
    }: InitOptions = {}) {

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

        if (Object.keys(context).length > 0) {
            this.op.setGlobalProperties(context);
        }
    }
    
    ready() {
        return this.op !== undefined;
    }

    private warnNoOp(message: string) {
        console.warn(`[Track] Ignoring action: ${message} - OpenPanel is not initialized. Call track.init() first.`);
    }

    // set global context
    context(properties: Record<string, any>) {
        if (this.op) {
            this.op.setGlobalProperties(properties);
        } else {
            this.warnNoOp('set context');
        }
    }

    // log an event
    event(name: string, properties?: Record<string, any>) {
        if (this.op) {
            this.op.track(name, properties);
        } else {
            this.warnNoOp(`log event "${name}"`);
        }
    }

    // identify user
    identify(profileId: string, props: {
        name?: string,
        avatar?: string,
        properties?: Record<string, any>
    }) {
        if (this.op) {
            this.op.identify({
                profileId: profileId,
                firstName: props.name,
                avatar: props.avatar,
                properties: props.properties
            });
        } else {
            this.warnNoOp(`identify user "${profileId}"`);
        }
    }

    // log out user (clear identity)
    logout() {
        if (this.op) {
            this.op.clear();
        } else {
            this.warnNoOp('logout user');
        }
    }

}

const track = new Track();
export default track;