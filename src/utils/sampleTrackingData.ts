
import { supabase } from "@/integrations/supabase/client";

export const createSampleTrackingData = async () => {
  try {
    // Check if sample data already exists
    const { data: existingShipments } = await supabase
      .from('shipments')
      .select('id')
      .in('tracking_number', ['XPR123456789', 'XPR987654321']);

    if (existingShipments && existingShipments.length > 0) {
      console.log('Sample tracking data already exists');
      return;
    }

    // Create sample shipments
    const sampleShipments = [
      {
        tracking_number: 'XPR123456789',
        origin: 'New York, NY',
        destination: 'Los Angeles, CA',
        status: 'In Transit',
        current_location: 'Chicago Distribution Center',
        estimated_delivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        weight: 2.5,
        dimensions: '12x8x6 inches',
        service_type: 'Express',
        user_id: null // Public tracking
      },
      {
        tracking_number: 'XPR987654321',
        origin: 'Miami, FL',
        destination: 'Seattle, WA',
        status: 'Delivered',
        current_location: 'Seattle Distribution Center',
        estimated_delivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        weight: 1.8,
        dimensions: '10x6x4 inches',
        service_type: 'Standard',
        user_id: null // Public tracking
      }
    ];

    const { data: shipments, error: shipmentError } = await supabase
      .from('shipments')
      .insert(sampleShipments)
      .select();

    if (shipmentError) {
      console.error('Error creating sample shipments:', shipmentError);
      return;
    }

    // Create sample tracking events
    const trackingEvents = [
      // Events for XPR123456789
      {
        shipment_id: shipments[0].id,
        event_type: 'Order Received',
        description: 'Package received at XPREXX facility',
        location: 'New York Processing Center',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        shipment_id: shipments[0].id,
        event_type: 'In Transit',
        description: 'Package departed from origin facility',
        location: 'New York, NY',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        shipment_id: shipments[0].id,
        event_type: 'In Transit',
        description: 'Package arrived at sorting facility',
        location: 'Chicago Distribution Center',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      // Events for XPR987654321
      {
        shipment_id: shipments[1].id,
        event_type: 'Order Received',
        description: 'Package received at XPREXX facility',
        location: 'Miami Processing Center',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        shipment_id: shipments[1].id,
        event_type: 'In Transit',
        description: 'Package in transit to destination',
        location: 'Denver Hub',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        shipment_id: shipments[1].id,
        event_type: 'Out for Delivery',
        description: 'Package out for delivery',
        location: 'Seattle Distribution Center',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        shipment_id: shipments[1].id,
        event_type: 'Delivered',
        description: 'Package delivered successfully',
        location: 'Seattle, WA',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const { error: eventsError } = await supabase
      .from('tracking_events')
      .insert(trackingEvents);

    if (eventsError) {
      console.error('Error creating sample tracking events:', eventsError);
    } else {
      console.log('Sample tracking data created successfully');
    }

  } catch (error) {
    console.error('Error in createSampleTrackingData:', error);
  }
};
